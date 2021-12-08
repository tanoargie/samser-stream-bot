import { WebhookClient } from 'discord.js';

const webhookClient = new WebhookClient({
  url: process.env.DISCORD_WEBHOOK_CLIENT,
});

export default webhookClient;
