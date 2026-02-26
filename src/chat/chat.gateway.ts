import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { TypingDto } from './dto/typing.dto';
import { auth } from '../../lib/auth';
import { Logger } from '@nestjs/common';

/** Extend the Socket type to carry authenticated user data. */
interface AuthenticatedSocket extends Socket {
  data: { userId: string; userName: string };
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const cookies = client.handshake.headers.cookie;
      if (!cookies) throw new Error('No cookies');

      const session = await auth.api.getSession({
        headers: new Headers({ cookie: cookies }),
      });

      if (!session?.user) throw new Error('Invalid session');

      client.data.userId = session.user.id;
      client.data.userName = session.user.name;

      this.logger.log(`Client connected: ${session.user.name} (${client.id})`);
    } catch (error) {
      this.logger.warn(`Unauthorized connection attempt: ${client.id}`);
      client.emit('error', { message: 'Unauthorized' });
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // ─── Events ────────────────────────────────────────────────

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() dto: JoinRoomDto,
  ) {
    const userId = client.data.userId;
    const allowed = await this.chatService.isUserInRoom(dto.chatRoomId, userId);
    if (!allowed) {
      client.emit('error', { message: 'You are not a member of this room' });
      return;
    }
    client.join(dto.chatRoomId);
    const history = await this.chatService.getMessageHistory(dto.chatRoomId);
    client.emit('messageHistory', history);

    this.logger.log(`${client.data.userName} joined room ${dto.chatRoomId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() dto: JoinRoomDto,
  ) {
    client.leave(dto.chatRoomId);
    this.logger.log(`${client.data.userName} left room ${dto.chatRoomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() dto: SendMessageDto,
  ) {
    const userId = client.data.userId;
    const message = await this.chatService.saveMessage(
      dto.chatRoomId,
      userId,
      dto.content,
    );
    this.server.to(dto.chatRoomId).emit('newMessage', message);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() dto: TypingDto,
  ) {
    client.to(dto.chatRoomId).emit('userTyping', {
      userId: client.data.userId,
      userName: client.data.userName,
      isTyping: dto.isTyping,
    });
  }
}
