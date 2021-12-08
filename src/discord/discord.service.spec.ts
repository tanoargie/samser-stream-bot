import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { WebhookClient, MessageEmbed } from 'discord.js';

describe('DiscordService', () => {
  let service: DiscordService;
  let webhookClient: WebhookClient;
  const mockSend = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscordService,
        {
          provide: 'WEBHOOK_CLIENT',
          useValue: { send: mockSend },
        },
      ],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
    webhookClient = module.get<WebhookClient>('WEBHOOK_CLIENT');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendWebhookMessage', () => {
    it('calls send with correct payload', async () => {
      const content = 'Testing message!';
      const embeds = [
        new MessageEmbed().setTitle('En vivo!').setColor('#0099ff'),
      ];

      await webhookClient.send({
        content,
        username: 'tano#5049',
        avatarURL: process.env.DISCORD_BOT_IMAGE,
        embeds,
      });

      expect(mockSend).toHaveBeenCalledWith({
        content,
        username: 'tano#5049',
        avatarURL: process.env.DISCORD_BOT_IMAGE,
        embeds,
      });
    });
  });
});
