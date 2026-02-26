import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  create(@Body() dto: CreateListingDto, @Session() session) {
    return this.listingsService.create(dto, session.user.id);
  }

  @AllowAnonymous()
  @Get()
  findAll(@Query('category') category?: string, @Query('search') search?: string) {
    return this.listingsService.findAll(category, search);
  }

  @Get('saved')
  findSaved(@Session() session) {
    return this.listingsService.findSaved(session.user.id);
  }

  @Get('my')
  findMy(@Session() session) {
    return this.listingsService.findByUser(session.user.id);
  }

  @AllowAnonymous()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateListingDto, @Session() session) {
    return this.listingsService.update(id, dto, session.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session) {
    return this.listingsService.remove(id, session.user.id);
  }

  @Post(':id/save')
  save(@Param('id') id: string, @Session() session) {
    return this.listingsService.save(id, session.user.id);
  }

  @Delete(':id/save')
  unsave(@Param('id') id: string, @Session() session) {
    return this.listingsService.unsave(id, session.user.id);
  }
}
