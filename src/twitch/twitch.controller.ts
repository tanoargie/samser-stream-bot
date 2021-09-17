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
  async subscribeToOnlineStream(@Body() body: { id: string }) {
    await this.twitchService.subscribeToOnlineStream(body.id);
  }

  @Delete('subscriptions/:id')
  async unsubscribe(@Param() params: { id: string }) {
    await this.twitchService.unsubscribe(params.id);
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
