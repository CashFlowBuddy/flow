import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoomEntity } from './entities/chat-room.entity';
import { Session } from '@thallesp/nestjs-better-auth';
import { MessageEntity } from './entities/message.entity';

@ApiTags('Chat Rooms')
@Controller('chat-rooms')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Create a chat room for a listing' })
  @ApiResponse({ status: 201, description: 'Chat room created', type: ChatRoomEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() dto: CreateChatRoomDto, @Session() session) {
    return this.chatService.createRoom(dto.listingId, session.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chat rooms for the current user' })
  @ApiResponse({ status: 200, description: 'List of chat rooms', type: ChatRoomEntity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Session() session) {
    return this.chatService.getRoomsForUser(session.user.id);
  }

  @Get(':id/messages')
  @ApiOperation({ summary: 'Get message history for a chat room' })
  @ApiResponse({ status: 200, description: 'List of messages', type: MessageEntity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findMessages(@Param('id') id: string, @Session() session) {
    return this.chatService.getMessageHistory(id, session.user.id);
  }
}
