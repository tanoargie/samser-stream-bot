import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitchModule } from './twitch/twitch.module';
import { DiscordModule } from './discord/discord.module';
import { TwitterModule } from './twitter/twitter.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TwitchModule, DiscordModule, TwitterModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
