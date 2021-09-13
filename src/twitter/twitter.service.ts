import { Injectable } from '@nestjs/common';
import { TwitterClient } from 'twitter-api-client';

@Injectable()
export class TwitterService {
  private twitterClient: TwitterClient;

  constructor() {
    const twitterClient = new TwitterClient({
      apiKey: process.env.TWITTER_CLIENT_API_KEY,
      apiSecret: process.env.TWITTER_CLIENT_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    this.twitterClient = twitterClient;
  }

  async sendTweet(tweet: string) {
    return this.twitterClient.tweets.statusesUpdate({ status: tweet });
  }
}
