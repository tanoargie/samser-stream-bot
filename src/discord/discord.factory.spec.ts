import { WebhookClient } from 'discord.js';
import DiscordFactory from './discord.factory';

jest.mock('discord.js');

describe('DiscordFactory', () => {
  it('has the correct provide', () => {
    expect(DiscordFactory.provide).toEqual('WEBHOOK_CLIENT');
  });

  it('has the correct useFactory', () => {
    process.env = {
      DISCORD_WEBHOOK_CLIENT: 'webhook_client',
    };
    DiscordFactory.useFactory();
    expect(WebhookClient).toHaveBeenCalledWith({
      url: 'webhook_client',
    });
  });
});
