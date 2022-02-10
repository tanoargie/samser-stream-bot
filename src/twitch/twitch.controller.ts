import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Inject,
} from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Controller('twitch')
export class TwitchController {
  constructor(@Inject('LISTENER') private twitchService: TwitchService) {}

  @Post('subscribeToOnlineStream')
  async subscribeToOnlineStream(
    @Body()
    body: {
      id: string;
      embedDiscordMessage?: string;
      discordMessage?: string;
      tweetMessage?: string;
      twitterProfileName?: string;
    },
  ) {
    const {
      id,
      embedDiscordMessage,
      discordMessage,
      tweetMessage,
      twitterProfileName,
    } = body;

    return this.twitchService.subscribeToOnlineStream(
      id,
      embedDiscordMessage,
      discordMessage,
      tweetMessage,
      twitterProfileName,
    );
  }

  @Delete('subscriptions/:id')
  async unsubscribe(@Param() params: { id: string }) {
    return this.twitchService.unsubscribe(params.id);
  }

  @Get('subscriptions')
  async getAllSubscriptions() {
    const subscriptions = await this.twitchService.getAllSubscriptions();
    return subscriptions.data.map((sub) => sub.id);
  }

  @Delete('subscriptions')
  async unsubscribeAll() {
    return this.twitchService.unsubscribeAll();
  }
}
