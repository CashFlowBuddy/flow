import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';

@ApiTags('Pictures')
@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a picture for a listing' })
  @ApiResponse({ status: 201, description: 'Picture created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() dto: CreatePictureDto, @Session() session) {
    return this.picturesService.create(dto, session.user.id);
  }

  @AllowAnonymous()
  @Get()
  @ApiOperation({ summary: 'Get all pictures for a listing' })
  @ApiQuery({ name: 'listingId', required: true, description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'List of pictures' })
  findByListing(@Query('listingId') listingId: string) {
    return this.picturesService.findByListing(listingId);
  }

  @AllowAnonymous()
  @Get(':id')
  @ApiOperation({ summary: 'Get a picture by ID' })
  @ApiParam({ name: 'id', description: 'Picture ID' })
  @ApiResponse({ status: 200, description: 'The picture' })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a picture' })
  @ApiParam({ name: 'id', description: 'Picture ID' })
  @ApiResponse({ status: 200, description: 'Picture deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  remove(@Param('id') id: string, @Session() session) {
    return this.picturesService.remove(id, session.user.id);
  }
}
