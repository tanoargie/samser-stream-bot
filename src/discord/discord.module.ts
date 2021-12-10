import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ConfigModule } from '@nestjs/config';
import DiscordFactory from './discord.factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
  ],
  providers: [DiscordService, DiscordFactory],
  exports: [DiscordService],
})
export class DiscordModule {}
