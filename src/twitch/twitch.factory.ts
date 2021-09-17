import { TwitchService } from './twitch.service';
import { TwitterService } from '../twitter/twitter.service';
import { DiscordService } from '../discord/discord.service';

const twitchFactory = {
  provide: 'LISTENER',
  useFactory: async (
    discordService: DiscordService,
    twitterService: TwitterService,
  ) => {
    const twitchService = new TwitchService(discordService, twitterService);
    await twitchService.init();
    return twitchService;
  },
  inject: [DiscordService, TwitterService],
};

export default twitchFactory;
