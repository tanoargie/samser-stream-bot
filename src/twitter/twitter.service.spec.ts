import { Test, TestingModule } from '@nestjs/testing';
import { TwitterService } from './twitter.service';

describe('TwitterService', () => {
  let service: TwitterService;
  const mockStatusUpdate = jest.fn();
  const mockAccountUpdateProfile = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwitterService,
        {
          provide: 'TWITTER_CLIENT',
          useValue: {
            tweets: {
              statusesUpdate: mockStatusUpdate,
            },
            accountsAndUsers: {
              accountUpdateProfile: mockAccountUpdateProfile,
            },
          },
        },
      ],
    }).compile();

    service = module.get<TwitterService>(TwitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendTweet', () => {
    it('sends the correct payload', async () => {
      const status = 'Test tweet!';
      await service.sendTweet(status);
      expect(mockStatusUpdate).toHaveBeenCalledWith({ status });
    });
  });

  describe('changeProfileName', () => {
    it('sends the correct payload', async () => {
      const newName = 'Faustino Doro';
      await service.changeProfileName(newName);
      expect(mockAccountUpdateProfile).toHaveBeenCalledWith({ name: newName });
    });
  });
});
