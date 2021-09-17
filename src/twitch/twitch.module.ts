import { Module } from '@nestjs/common';
import { DiscordModule } from 'src/discord/discord.module';
import { TwitterModule } from 'src/twitter/twitter.module';
import { TwitchController } from './twitch.controller';
import TwitchFactory from './twitch.factory';

@Module({
  imports: [TwitterModule, DiscordModule],
  controllers: [TwitchController],
  providers: [TwitchFactory],
})
export class TwitchModule {}
