import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitchModule } from './twitch/twitch.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TwitchModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
