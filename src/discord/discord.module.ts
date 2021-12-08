import { Module } from '@nestjs/common';
import webhookClient from './discord.client';
import { DiscordService } from './discord.service';

@Module({
  providers: [
    DiscordService,
    {
      provide: 'WEBHOOK_CLIENT',
      useValue: webhookClient,
    },
  ],
  exports: [DiscordService],
})
export class DiscordModule {}
