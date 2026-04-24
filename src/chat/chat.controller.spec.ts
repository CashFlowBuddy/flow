import { ChatController } from './chat.controller';

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  OptionalAuth: () => () => undefined,
  Session: () => () => undefined,
}));

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('ChatController', () => {
  let controller: ChatController;
  let service: any;

  beforeEach(() => {
    service = {
      createRoom: jest.fn(),
      getRoomsForUser: jest.fn(),
      getMessageHistory: jest.fn(),
    };

    controller = new ChatController(service);
  });

  it('create should call service with listing and user id', () => {
    controller.create({ listingId: 'l1' }, { user: { id: 'u1' } });

    expect(service.createRoom).toHaveBeenCalledWith('l1', 'u1');
  });

  it('findAll should call service with current user id', () => {
    controller.findAll({ user: { id: 'u1' } });

    expect(service.getRoomsForUser).toHaveBeenCalledWith('u1');
  });

  it('findMessages should call service with room and user id', () => {
    controller.findMessages('room-1', { user: { id: 'u1' } });

    expect(service.getMessageHistory).toHaveBeenCalledWith('room-1', 'u1');
  });
});
