import TwitchListener from './twitch.listener';
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import TwitchClient from '../../src/twitch/twitch.client';

jest.mock('@twurple/eventsub', () => ({
  ReverseProxyAdapter: jest.fn().mockImplementation(({ hostName, port }) => ({
    hostName,
    port,
  })),
  EventSubListener: jest
    .fn()
    .mockImplementation(({ apiClient, adapter, secret }) => ({
      apiClient,
      adapter,
      secret,
    })),
}));
jest.mock('@twurple/api');
jest.mock('@twurple/eventsub-ngrok', () => ({
  NgrokAdapter: jest.fn(() => ({ adapter: 'ngrok' })),
}));

jest.mock('../../src/twitch/twitch.client');

describe('TwitchListener', () => {
  const env = {
    EVENT_SUB_SECRET: 'event_sub_secret',
    TWITCH_CALLBACK_HOSTNAME: 'hostname',
  };
  const apiClient = TwitchClient();

  describe('when it is not local', () => {
    beforeAll(() => {
      process.env = { ...env, IS_LOCAL_LISTENER: 'false' };
      TwitchListener(apiClient);
    });

    it('calls ReverseProxyAdapter constructor with correct params if is not local', () => {
      expect(ReverseProxyAdapter).toHaveBeenCalled();
      expect(ReverseProxyAdapter).toHaveBeenCalledWith({
        hostName: 'hostname',
        port: 3001,
      });
    });

    it('calls EventSubListener constructor with correct params', () => {
      expect(EventSubListener).toHaveBeenCalledWith({
        apiClient,
        adapter: { hostName: 'hostname', port: 3001 },
        secret: 'event_sub_secret',
      });
    });
  });

  describe('when is it local', () => {
    beforeAll(() => {
      process.env = { ...env, IS_LOCAL_LISTENER: 'true' };
      TwitchListener(apiClient);
    });

    it('calls NgrokAdapter constructor with empty params', () => {
      expect(NgrokAdapter).toHaveBeenCalled();
      expect(NgrokAdapter).toHaveBeenCalledWith();
    });

    it('calls EventSubListener constructor with correct params', () => {
      expect(EventSubListener).toHaveBeenCalledWith({
        apiClient,
        adapter: { adapter: 'ngrok' },
        secret: 'event_sub_secret',
      });
    });
  });
});
