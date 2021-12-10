import { ApiClient } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';

const client = () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  const authProvider = new ClientCredentialsAuthProvider(
    clientId,
    clientSecret,
  );

  return new ApiClient({ authProvider });
};

export default client;
