import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import DiscordFactory from './discord.factory';

@Module({
  providers: [DiscordService, DiscordFactory],
  exports: [DiscordService],
})
export class DiscordModule {}
