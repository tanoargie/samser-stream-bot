import { Injectable } from '@nestjs/common';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub';

@Injectable()
export class TwitchService {
  private authProvider: ClientCredentialsAuthProvider;
  private apiClient: ApiClient;
  private listener: EventSubListener;

  constructor() {
    const clientId = process.env.TWITCH_API_CLIENT_ID;
    const clientSecret = process.env.TWITCH_API_CLIENT_SECRET;
    const secret = process.env.eventSubSecret;

    const authProvider = new ClientCredentialsAuthProvider(
      clientId,
      clientSecret,
    );
    const apiClient = new ApiClient({ authProvider });
    const listener = new EventSubListener({
      apiClient,
      adapter: new ReverseProxyAdapter({
        hostName: 'example.com', // The host name the server is available from
      }),
      secret,
    });

    this.authProvider = authProvider;
    this.apiClient = apiClient;
    this.listener = listener;
  }

  async subscribeToStreamOnline(userId: string) {
    const onlineSubscription =
      await this.listener.subscribeToStreamOnlineEvents(userId, (e) => {
        console.log(`${e.broadcasterDisplayName} just went live!`);
      });
    return onlineSubscription;
  }
}
