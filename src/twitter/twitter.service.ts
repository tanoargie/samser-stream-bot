import { Inject, Injectable } from '@nestjs/common';
import { TwitterClient } from 'twitter-api-client';

@Injectable()
export class TwitterService {
  constructor(@Inject('TWITTER_CLIENT') private twitterClient: TwitterClient) {}

  async sendTweet(tweet: string) {
    return this.twitterClient.tweets.statusesUpdate({ status: tweet });
  }

  async changeProfileName(newName: string) {
    return this.twitterClient.accountsAndUsers.accountUpdateProfile({
      name: newName,
    });
  }
}
