import { Controller, Post, Body } from '@nestjs/common';
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
  async subscribeToStreamOnline(@Body() body: { id: string }) {
    if (!this.initialized) {
      await this.initService();
    }
    await this.twitchService.subscribeToStreamOnline(body.id);
  }
}
