import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Controller('twitch')
export class TwitchController {
  private initialized: boolean;

  constructor(private twitchService: TwitchService) {
    this.initialized = false;
  }

  async initService() {
    await this.twitchService.init();
    this.initialized = true;
  }

  @Post('subscribeToOnlineStream')
  async subscribeToOnlineStream(@Body() body: { id: string }) {
    if (!this.initialized) {
      await this.initService();
    }
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
