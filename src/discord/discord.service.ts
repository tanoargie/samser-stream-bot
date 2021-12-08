import { Injectable } from '@nestjs/common';
import { MessageEmbed, WebhookClient } from 'discord.js';

@Injectable()
export class DiscordService {
  private announcementsWebhook: WebhookClient;

  constructor() {
    const webhookClient = new WebhookClient({
      url: process.env.DISCORD_WEBHOOK_CLIENT,
    });
    this.announcementsWebhook = webhookClient;
  }

  async sendWebhookMessage(message: string) {
    const embed = new MessageEmbed().setTitle('En vivo!').setColor('#0099ff');
    return this.announcementsWebhook.send({
      content: message,
      username: 'tano#5049',
      avatarURL: process.env.DISCORD_BOT_IMAGE,
      embeds: [embed],
    });
  }
}
