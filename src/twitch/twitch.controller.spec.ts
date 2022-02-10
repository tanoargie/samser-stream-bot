import { Test, TestingModule } from '@nestjs/testing';
import { TwitchController } from './twitch.controller';

describe('TwitchController', () => {
  let controller: TwitchController;

  const mockSubscribeToOnlineStream = jest.fn();
  const mockUnsubscribe = jest.fn();
  const mockGetAllSubscriptions = jest.fn(() => ({
    data: [{ id: 1 }, { id: 2 }],
  }));
  const mockUnsubscribeAll = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwitchController],
      providers: [
        {
          provide: 'LISTENER',
          useValue: {
            unsubscribeAll: mockUnsubscribeAll,
            getAllSubscriptions: mockGetAllSubscriptions,
            unsubscribe: mockUnsubscribe,
            subscribeToOnlineStream: mockSubscribeToOnlineStream,
          },
        },
      ],
    }).compile();

    controller = module.get<TwitchController>(TwitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when subscribing to online stream', () => {
    it('calls service with correct body id', async () => {
      const id = 'test_id';
      const embedDiscordMessage = 'embed_message';
      const discordMessage = 'discord_message';
      const tweetMessage = 'twitter_message';
      const twitterProfileName = 'twitter_profile_name';

      await controller.subscribeToOnlineStream({
        id,
        embedDiscordMessage,
        discordMessage,
        tweetMessage,
        twitterProfileName,
      });
      expect(mockSubscribeToOnlineStream).toHaveBeenCalledWith(
        id,
        embedDiscordMessage,
        discordMessage,
        tweetMessage,
        twitterProfileName,
      );
    });
  });

  describe('when unsubscribing to online stream', () => {
    it('calls service with correct params id', async () => {
      const id = 'test_id';
      await controller.unsubscribe({ id });
      expect(mockUnsubscribe).toHaveBeenCalledWith(id);
    });
  });

  describe('when getting all subscriptions', () => {
    it('calls service', async () => {
      const result = await controller.getAllSubscriptions();
      expect(mockGetAllSubscriptions).toHaveBeenCalled();
      expect(result).toEqual([1, 2]);
    });
  });

  describe('when unsubscribing from all subscriptions', () => {
    it('calls service', async () => {
      await controller.unsubscribeAll();
      expect(mockUnsubscribeAll).toHaveBeenCalled();
    });
  });
});
