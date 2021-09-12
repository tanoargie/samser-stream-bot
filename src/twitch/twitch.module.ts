import { Module } from '@nestjs/common';
import { TwitchController } from './twitch.controller';

@Module({
  controllers: [TwitchController],
})
export class TwitchModule {}
