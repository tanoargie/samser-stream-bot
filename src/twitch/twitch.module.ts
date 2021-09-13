import { Module } from '@nestjs/common';
import { DiscordModule } from 'src/discord/discord.module';
import { TwitterModule } from 'src/twitter/twitter.module';
import { TwitchController } from './twitch.controller';
import { TwitchService } from './twitch.service';

@Module({
  imports: [TwitterModule, DiscordModule],
  controllers: [TwitchController],
  providers: [TwitchService],
})
export class TwitchModule {}
