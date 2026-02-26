import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  create(@Body() dto: CreatePictureDto, @Session() session) {
    return this.picturesService.create(dto, session.user.id);
  }

  @AllowAnonymous()
  @Get()
  findByListing(@Query('listingId') listingId: string) {
    return this.picturesService.findByListing(listingId);
  }

  @AllowAnonymous()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session) {
    return this.picturesService.remove(id, session.user.id);
  }
}
