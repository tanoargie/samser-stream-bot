import TwitchListener from './twitch.listener';
import { ApiClient } from '@twurple/api';
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub';

jest.mock('@twurple/eventsub', () => ({
  ReverseProxyAdapter: jest.fn(() => ({
    reverseProxyAdapterInstance: 'proxy_instance',
  })),
  EventSubListener: jest.fn(() => ({
    eventSubListenerInstance: 'sub_instance',
  })),
}));

jest.mock('@twurple/api', () => ({
  ApiClient: jest.fn(() => ({
    apiClientInstance: 'api_instance',
  })),
}));

describe('TwitchListener', () => {
  process.env = {
    EVENT_SUB_SECRET: 'event_sub_secret',
    TWITCH_CALLBACK_HOSTNAME: 'hostname',
  };

  beforeAll(() => {
    //eslint-disable-next-line
    // @ts-ignore
    TwitchListener({ apiClientInstance: 'api_instance' });
  });

  it('calls ReverseProxyAdapter constructor with correct params', () => {
    expect(ReverseProxyAdapter).toHaveBeenCalledWith({
      hostName: 'hostname',
      port: 3001,
    });
  });

  it('calls EventSubListener constructor with correct params', () => {
    expect(EventSubListener).toHaveBeenCalledWith({
      apiClient: {
        apiClientInstance: 'api_instance',
      },
      adapter: {
        reverseProxyAdapterInstance: 'proxy_instance',
      },
      secret: 'event_sub_secret',
    });
  });
});
