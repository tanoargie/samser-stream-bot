import { ApiClient } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
import TwitchClient from './twitch.client';

jest.mock('@twurple/auth', () => ({
  ClientCredentialsAuthProvider: jest.fn(() => ({
    newAuthProviderClass: 'test',
  })),
}));
jest.mock('@twurple/api');

describe('TwitchClient', () => {
  process.env = {
    TWITCH_CLIENT_ID: 'client_id',
    TWITCH_CLIENT_SECRET: 'client_secret',
  };

  beforeAll(() => {
    TwitchClient();
  });

  it('initializes authProvider correctly', () => {
    expect(ClientCredentialsAuthProvider).toHaveBeenCalledWith(
      'client_id',
      'client_secret',
    );
  });

  it('initializes apiClient correctly', () => {
    expect(ApiClient).toHaveBeenCalledWith({
      authProvider: { newAuthProviderClass: 'test' },
    });
  });
});
