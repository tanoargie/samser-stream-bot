import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { MessageEmbed } from 'discord.js';

describe('DiscordService', () => {
  let service: DiscordService;
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
      await service.sendWebhookMessage(content, embeds);

      expect(mockSend).toHaveBeenCalledWith({
        content,
        username: process.env.DISCORD_BOT_USERNAME,
        avatarURL: process.env.DISCORD_BOT_IMAGE,
        embeds,
      });
    });
  });
});
