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
    embedDiscordMessage: string,
    discordMessage: string,
    tweetMessage: string,
  ) {
    return this.listener.subscribeToStreamOnlineEvents(userId, async () => {
      const embed = new MessageEmbed().setTitle(embedDiscordMessage);
      await this.discordService.sendWebhookMessage(discordMessage, [embed]);
      await this.twitterService.sendTweet(tweetMessage);
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
