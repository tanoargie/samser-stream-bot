import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import twitterClient from './twitter.client';

@Module({
  providers: [
    TwitterService,
    {
      provide: 'TWITTER_CLIENT',
      useValue: twitterClient,
    },
  ],
  exports: [TwitterService],
})
export class TwitterModule {}
