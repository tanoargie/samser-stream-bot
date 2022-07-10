import { ApiClient } from '@twurple/api';
import { EventSubListener } from '@twurple/eventsub';
import { TwitterService } from '../twitter/twitter.service';
import { DiscordService } from '../discord/discord.service';
import { MessageEmbed } from 'discord.js';
import TwitchListener from './twitch.listener';
import TwitchClient from './twitch.client';

export class TwitchService {
  private listener: EventSubListener;
  private apiClient: ApiClient;

  constructor(
    private discordService: DiscordService,
    private twitterService: TwitterService,
  ) {
    const apiClient = TwitchClient();
    const listener = TwitchListener(apiClient);

    this.apiClient = apiClient;
    this.listener = listener;
  }

  async init() {
    await this.listener.listen();
  }

  async subscribeToOnlineStream(
    userId: string,
    discordMessage?: {
      embed: string;
      message: string;
    },
    twitterMessage?: string,
    twitterProfileName?: string,
  ) {
    return this.listener.subscribeToStreamOnlineEvents(userId, async () => {
      if (discordMessage) {
        const { embed, message } = discordMessage;
        await this.discordService.sendWebhookMessage(message, [
          new MessageEmbed().setTitle(embed),
        ]);
      }
      if (twitterMessage) await this.twitterService.sendTweet(twitterMessage);
      if (twitterProfileName) {
        await this.twitterService.changeProfileName(twitterProfileName);
      }
    });
  }

  async unsubscribe(subscriptionId: string) {
    return this.apiClient.eventSub.deleteSubscription(subscriptionId);
  }

  async getAllSubscriptions() {
    return this.apiClient.eventSub.getSubscriptions();
  }

  async unsubscribeAll() {
    await this.apiClient.eventSub.deleteAllSubscriptions();
  }
}
