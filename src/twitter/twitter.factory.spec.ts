import { TwitterClient } from 'twitter-api-client';
import TwitterFactory from './twitter.factory';

jest.mock('twitter-api-client');

describe('TwitterFactory', () => {
  it('has the correct provide', () => {
    expect(TwitterFactory.provide).toEqual('TWITTER_CLIENT');
  });

  it('has the correct useFactory function', () => {
    process.env = {
      TWITTER_CLIENT_API_KEY: 'api_key',
      TWITTER_CLIENT_API_SECRET: 'api_secret',
      TWITTER_ACCESS_TOKEN: 'token',
      TWITTER_ACCESS_TOKEN_SECRET: 'token_secret',
    };
    TwitterFactory.useFactory();
    expect(TwitterClient).toHaveBeenCalledWith({
      accessToken: 'token',
      accessTokenSecret: 'token_secret',
      apiKey: 'api_key',
      apiSecret: 'api_secret',
    });
  });
});
