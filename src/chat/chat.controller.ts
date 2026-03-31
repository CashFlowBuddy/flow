import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { Session } from '@thallesp/nestjs-better-auth';

@ApiTags('Chat Rooms')
@Controller('chat-rooms')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Create a chat room for a listing' })
  @ApiResponse({ status: 201, description: 'Chat room created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() dto: CreateChatRoomDto, @Session() session) {
    return this.chatService.createRoom(dto.listingId, session.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chat rooms for the current user' })
  @ApiResponse({ status: 200, description: 'List of chat rooms' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Session() session) {
    return this.chatService.getRoomsForUser(session.user.id);
  }
}
