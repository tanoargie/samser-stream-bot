import { ApiClient } from '@twurple/api';
import { EventSubListener } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';

const listener = (apiClient: ApiClient) => {
  const secret = process.env.EVENT_SUB_SECRET;

  // const adapter = new ReverseProxyAdapter({
  //   hostName: process.env.TWITCH_CALLBACK_HOSTNAME,
  //   port: 3001,
  // });

  const localAdapter = new NgrokAdapter();

  return new EventSubListener({
    apiClient,
    adapter: localAdapter,
    secret,
  });
};

export default listener;
