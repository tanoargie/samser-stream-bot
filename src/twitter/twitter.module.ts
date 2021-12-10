import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import TwitterFactory from './twitter.factory';

@Module({
  providers: [TwitterService, TwitterFactory],
  exports: [TwitterService],
})
export class TwitterModule {}
