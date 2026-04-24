import { ChatGateway } from './chat.gateway';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

const mockGetSession = jest.fn();

jest.mock('../../lib/auth', () => ({
  auth: {
    api: {
      getSession: (...args: any[]) => mockGetSession(...args),
    },
  },
}));

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: any;
  let socket: any;

  beforeEach(() => {
    chatService = {
      isUserInRoom: jest.fn(),
      getMessageHistory: jest.fn(),
      saveMessage: jest.fn(),
    };

    gateway = new ChatGateway(chatService);
    gateway.server = {
      to: jest.fn().mockReturnValue({ emit: jest.fn() }),
    } as any;

    socket = {
      id: 'socket-1',
      handshake: { headers: { cookie: 'session=test' } },
      data: {},
      emit: jest.fn(),
      disconnect: jest.fn(),
      join: jest.fn(),
      leave: jest.fn(),
      to: jest.fn().mockReturnValue({ emit: jest.fn() }),
    };

    mockGetSession.mockReset();
  });

  it('handleConnection should attach user identity for valid session', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'u1', name: 'Alice' } });

    await gateway.handleConnection(socket);

    expect(socket.data.userId).toBe('u1');
    expect(socket.data.userName).toBe('Alice');
  });

  it('handleConnection should disconnect unauthorized clients', async () => {
    socket.handshake.headers.cookie = undefined;

    await gateway.handleConnection(socket);

    expect(socket.emit).toHaveBeenCalledWith('error', { message: 'Unauthorized' });
    expect(socket.disconnect).toHaveBeenCalledWith(true);
  });

  it('handleJoinRoom should reject users outside the room', async () => {
    socket.data.userId = 'u1';
    chatService.isUserInRoom.mockResolvedValue(false);

    await gateway.handleJoinRoom(socket, { chatRoomId: 'room-1' });

    expect(socket.emit).toHaveBeenCalledWith('error', {
      message: 'You are not a member of this room',
    });
    expect(socket.join).not.toHaveBeenCalled();
  });

  it('handleJoinRoom should join and emit history for allowed users', async () => {
    socket.data.userId = 'u1';
    socket.data.userName = 'Alice';
    chatService.isUserInRoom.mockResolvedValue(true);
    chatService.getMessageHistory.mockResolvedValue([{ id: 'm1' }]);

    await gateway.handleJoinRoom(socket, { chatRoomId: 'room-1' });

    expect(socket.join).toHaveBeenCalledWith('room-1');
    expect(socket.emit).toHaveBeenCalledWith('messageHistory', [{ id: 'm1' }]);
  });

  it('handleSendMessage should broadcast new messages to room', async () => {
    socket.data.userId = 'u1';
    chatService.saveMessage.mockResolvedValue({ id: 'm1' });

    const roomEmitter = { emit: jest.fn() };
    (gateway.server.to as jest.Mock).mockReturnValue(roomEmitter);

    await gateway.handleSendMessage(socket, {
      chatRoomId: 'room-1',
      content: 'hello',
    });

    expect(roomEmitter.emit).toHaveBeenCalledWith('newMessage', { id: 'm1' });
  });

  it('handleTyping should notify other room participants', () => {
    socket.data.userId = 'u1';
    socket.data.userName = 'Alice';
    const roomEmitter = { emit: jest.fn() };
    socket.to.mockReturnValue(roomEmitter);

    gateway.handleTyping(socket, { chatRoomId: 'room-1', isTyping: true });

    expect(roomEmitter.emit).toHaveBeenCalledWith('userTyping', {
      userId: 'u1',
      userName: 'Alice',
      isTyping: true,
    });
  });
});
