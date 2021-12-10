import { WebhookClient } from 'discord.js';

const discordFactory = {
  provide: 'WEBHOOK_CLIENT',
  useFactory: () => {
    const webhookClient = new WebhookClient({
      url: process.env.DISCORD_WEBHOOK_CLIENT,
    });
    return webhookClient;
  },
};

export default discordFactory;
