import { ApiClient } from '@twurple/api';
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub';

const listener = (apiClient: ApiClient) => {
  const secret = process.env.EVENT_SUB_SECRET;

  const adapter = new ReverseProxyAdapter({
    hostName: process.env.TWITCH_CALLBACK_HOSTNAME,
    port: 3001,
  });

  return new EventSubListener({
    apiClient,
    adapter,
    secret,
  });
};

export default listener;
