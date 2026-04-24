import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  OptionalAuth: () => () => undefined,
  Session: () => () => undefined,
}));

describe('AppController', () => {
  let appController: AppController;
  const appService = {
    getHello: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    jest.clearAllMocks();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      appService.getHello.mockReturnValue('Hello World!');
      expect(appController.getHello()).toBe('Hello World!');
      expect(appService.getHello).toHaveBeenCalledTimes(1);
    });

    it('should return a protected greeting for authenticated users', () => {
      const result = appController.getProtected({
        user: { email: 'user@example.com' },
      });

      expect(result).toBe(
        'Hello, user@example.com! This is a protected route.',
      );
    });

    it('should return not authenticated message when session has no user', () => {
      const result = appController.getProtected({ user: null });

      expect(result).toBe('You are not authenticated.');
    });
  });
});
