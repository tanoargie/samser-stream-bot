import { DiscordService } from '../discord/discord.service';
import { TwitterService } from '../twitter/twitter.service';
import { TwitchService } from '../twitch/twitch.service';
import TwitchFactory from './twitch.factory';
import { WebhookClient } from 'discord.js';

jest.mock('discord.js', () => ({
  WebhookClient: {
    send: jest.fn(),
  },
}));

describe('TwitchFactory', () => {
  it('has the correct provide', () => {
    expect(TwitchFactory.provide).toEqual('LISTENER');
  });

  it('has the correct inject', () => {
    expect(TwitchFactory.inject).toHaveLength(2);
    expect(TwitchFactory.inject).toContain(DiscordService);
    expect(TwitchFactory.inject).toContain(TwitterService);
  });
});
