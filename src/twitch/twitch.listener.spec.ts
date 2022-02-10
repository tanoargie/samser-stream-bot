import TwitchListener from './twitch.listener';
import { EventSubListener } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import TwitchClient from '../../src/twitch/twitch.client';

jest.mock('@twurple/eventsub');
jest.mock('@twurple/api');
jest.mock('@twurple/eventsub-ngrok', () => ({
  NgrokAdapter: jest.fn().mockImplementation(() => ({
    ngrok: 'adapter',
  })),
}));

jest.mock('../../src/twitch/twitch.client');

describe('TwitchListener', () => {
  process.env = {
    EVENT_SUB_SECRET: 'event_sub_secret',
    TWITCH_CALLBACK_HOSTNAME: 'hostname',
  };

  const apiClient = TwitchClient();

  beforeAll(() => {
    TwitchListener(apiClient);
  });

  // it('calls ReverseProxyAdapter constructor with correct params', () => {
  //   expect(ReverseProxyAdapter).toHaveBeenCalledWith({
  //     hostName: 'hostname',
  //     port: 3001,
  //   });
  // });

  it('calls NgrokAdapter constructor with empty params', () => {
    expect(NgrokAdapter).toHaveBeenCalled();
    expect(NgrokAdapter).toHaveBeenCalledWith();
  });

  it('calls EventSubListener constructor with correct params', () => {
    NgrokAdapter;

    expect(EventSubListener).toHaveBeenCalledWith({
      apiClient,
      adapter: { ngrok: 'adapter' },
      secret: 'event_sub_secret',
    });
  });
});
