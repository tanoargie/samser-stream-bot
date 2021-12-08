import { Module } from '@nestjs/common';
import { TwitchModule } from './twitch/twitch.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TwitchModule, ConfigModule.forRoot()],
})
export class AppModule {}
