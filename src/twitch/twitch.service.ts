import { Injectable } from '@nestjs/common';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubListener } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import { TwitterService } from '../twitter/twitter.service';
import { DiscordService } from '../discord/discord.service';

@Injectable()
export class TwitchService {
  private listener: EventSubListener;

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
    const apiClient = new ApiClient({ authProvider });
    const listener = new EventSubListener({
      apiClient,
      adapter: new NgrokAdapter(),
      secret,
    });

    this.listener = listener;
  }

  async init() {
    await this.listener.listen();
  }

  async subscribeToStreamOnline(userId: string) {
    await this.listener.subscribeToStreamOnlineEvents(userId, async () => {
      await this.discordService.sendWebhookMessage(
        'El tano está en vivo en Twitch.',
      );
      await this.twitterService.sendTweet(
        'El tano está en vivo en Twitch. https://www.twitch.tv/tanoserio',
      );
    });
  }
}
