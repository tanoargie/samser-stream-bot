import { Test, TestingModule } from '@nestjs/testing';
import { TwitchService } from './twitch.service';
import TwitchFactory from './twitch.factory';
import { DiscordService } from '../discord/discord.service';
import { TwitterService } from '../twitter/twitter.service';

const mockListen = jest.fn();
const mockSubscribeToOnlineStream = jest.fn(
  (id: string, callback: () => void) => callback(),
);

jest.mock('./twitch.listener', () => ({
  default: () => ({
    listen: mockListen,
    subscribeToStreamOnlineEvents: mockSubscribeToOnlineStream,
  }),
}));

const mockDeleteSubscription = jest.fn();
const mockGetAllSubscriptions = jest.fn();
const mockDeleteAllSubscriptions = jest.fn();

jest.mock('./twitch.client', () => ({
  default: () => ({
    eventSub: {
      deleteSubscription: mockDeleteSubscription,
      getSubscriptions: mockGetAllSubscriptions,
      deleteAllSubscriptions: mockDeleteAllSubscriptions,
    },
  }),
}));

describe('TwitchService', () => {
  let service: TwitchService;
  const mockWebhookSend = jest.fn();
  const mockStatusesUpdate = jest.fn();
  const mockSendWebhookMessage = jest.fn();
  const mockSendTweet = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DiscordService,
          useValue: {
            sendWebhookMessage: mockSendWebhookMessage,
          },
        },
        {
          provide: TwitterService,
          useValue: {
            sendTweet: mockSendTweet,
          },
        },
        {
          provide: 'WEBHOOK_CLIENT',
          useValue: { send: mockWebhookSend },
        },
        {
          provide: 'TWITTER_CLIENT',
          useValue: {
            tweets: {
              statusesUpdate: mockStatusesUpdate,
            },
          },
        },
        TwitchFactory,
      ],
    }).compile();

    service = module.get<TwitchService>('LISTENER');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockListen).toHaveBeenCalled();
  });

  describe('when subscribing to online stream', () => {
    it('calls subscribeToOnlineStream correctly and triggers discord and twitter functions', async () => {
      const userId = 'user_id';
      await service.subscribeToOnlineStream(userId);
      expect(mockSubscribeToOnlineStream).toHaveBeenNthCalledWith(
        1,
        userId,
        expect.any(Function),
      );
      expect(mockSendWebhookMessage).toHaveBeenCalled();
      expect(mockSendTweet).toHaveBeenCalled();
    });
  });

  describe('when unsubscribing', () => {
    it('calls deleteSubscription with correct id', async () => {
      const subscriptionId = 'test_id';
      await service.unsubscribe(subscriptionId);
      expect(mockDeleteSubscription).toHaveBeenCalledWith(subscriptionId);
    });
  });

  describe('when getting all subscriptions', () => {
    it('calls getSubscriptions', async () => {
      await service.getAllSubscriptions();
      expect(mockGetAllSubscriptions).toHaveBeenCalled();
    });
  });

  describe('when unsubscribing from all subscriptions', () => {
    it('calls deleteAllSubscriptions', async () => {
      await service.unsubscribeAll();
      expect(mockDeleteAllSubscriptions).toHaveBeenCalled();
    });
  });
});
