import { TwitterClient } from 'twitter-api-client';

const twitterFactory = {
  provide: 'TWITTER_CLIENT',
  useFactory: () => {
    const twitterClient = new TwitterClient({
      apiKey: process.env.TWITTER_CLIENT_API_KEY,
      apiSecret: process.env.TWITTER_CLIENT_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    return twitterClient;
  },
};

export default twitterFactory;
