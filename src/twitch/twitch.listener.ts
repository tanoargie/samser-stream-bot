import { ApiClient } from '@twurple/api';
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';

const listener = (apiClient: ApiClient) => {
  const secret = process.env.EVENT_SUB_SECRET;
  const isLocal = process.env.IS_LOCAL_LISTENER;
  const port = Number(process.env.LISTENER_PORT) || 3001;
  const hostName = process.env.TWITCH_CALLBACK_HOSTNAME;

  const adapter =
    isLocal === 'true'
      ? new NgrokAdapter()
      : new ReverseProxyAdapter({
          hostName,
          port,
        });

  return new EventSubListener({
    apiClient,
    adapter,
    secret,
  });
};

export default listener;
