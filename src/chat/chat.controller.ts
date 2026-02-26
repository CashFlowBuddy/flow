import { Controller, Post, Get, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { Session } from '@thallesp/nestjs-better-auth';

@Controller('chat-rooms')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() dto: CreateChatRoomDto, @Session() session) {
    return this.chatService.createRoom(dto.listingId, session.user.id);
  }

  @Get()
  findAll(@Session() session) {
    return this.chatService.getRoomsForUser(session.user.id);
  }
}
