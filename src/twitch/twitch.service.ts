import { Injectable } from '@nestjs/common';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub';
import { TwitterService } from '../twitter/twitter.service';
import { DiscordService } from '../discord/discord.service';

@Injectable()
export class TwitchService {
  private listener: EventSubListener;
  private apiClient: ApiClient;

  constructor(
    private discordService: DiscordService,
    private twitterService: TwitterService,
  ) {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    const secret = process.env.EVENT_SUB_SECRET;

    const authProvider = new ClientCredentialsAuthProvider(
      clientId,
      clientSecret,
    );
    const adapter = new ReverseProxyAdapter({
      hostName: 'botcallback.samser.co',
      port: 3001,
    });
    // const adapter = new NgrokAdapter();
    const apiClient = new ApiClient({ authProvider });
    const listener = new EventSubListener({
      apiClient,
      adapter,
      secret,
    });

    this.apiClient = apiClient;
    this.listener = listener;
  }

  async init() {
    await this.listener.listen();
  }

  async subscribeToOnlineStream(userId: string) {
    return this.listener.subscribeToStreamOnlineEvents(userId, async () => {
      await this.discordService.sendWebhookMessage(
        'https://www.twitch.tv/tanoserio',
      );
      await this.twitterService.sendTweet(
        'El tano está en vivo en Twitch. https://www.twitch.tv/tanoserio',
      );
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
