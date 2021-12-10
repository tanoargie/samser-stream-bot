import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { ConfigModule } from '@nestjs/config';
import TwitterFactory from './twitter.factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
  ],
  providers: [TwitterService, TwitterFactory],
  exports: [TwitterService],
})
export class TwitterModule {}
