import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingEntity } from './entities/listing.entity';
import { AllowAnonymous, OptionalAuth, Session } from '@thallesp/nestjs-better-auth';

@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new listing' })
  @ApiResponse({ status: 201, description: 'Listing created', type: ListingEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() dto: CreateListingDto, @Session() session) {
    return this.listingsService.create(dto, session.user.id);
  }

  @OptionalAuth()
  @Get()
  @ApiOperation({ summary: 'Get all listings' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by keyword' })
  @ApiResponse({ status: 200, description: 'List of listings', type: ListingEntity, isArray: true })
  findAll(@Query('category') category?: string, @Query('search') search?: string) {
    return this.listingsService.findAll(category, search);
  }

  @Get('saved')
  @ApiOperation({ summary: 'Get saved listings for the current user' })
  @ApiResponse({ status: 200, description: 'List of saved listings', type: ListingEntity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findSaved(@Session() session) {
    return this.listingsService.findSaved(session.user.id);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get listings created by the current user' })
  @ApiResponse({ status: 200, description: 'List of own listings', type: ListingEntity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findMy(@Session() session) {
    return this.listingsService.findByUser(session.user.id);
  }

  @OptionalAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a listing by ID or URL slug' })
  @ApiParam({ name: 'id', description: 'Listing ID or URL slug' })
  @ApiResponse({ status: 200, description: 'The listing', type: ListingEntity })
  @ApiResponse({ status: 404, description: 'Listing not found' })
  findOne(@Param('id') id: string, @Session() session?: any) {
    return this.listingsService.findOne(id, session?.user?.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a listing' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing updated', type: ListingEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Listing not found' })
  update(@Param('id') id: string, @Body() dto: UpdateListingDto, @Session() session) {
    return this.listingsService.update(id, dto, session.user.id, session.user.role === 'ADMIN');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a listing' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing deleted', type: ListingEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Listing not found' })
  remove(@Param('id') id: string, @Session() session) {
    return this.listingsService.remove(id, session.user.id, session.user.role === 'ADMIN');
  }

  @Post(':id/save')
  @ApiOperation({ summary: 'Save a listing to favorites' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 201, description: 'Listing saved', type: ListingEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  save(@Param('id') id: string, @Session() session) {
    return this.listingsService.save(id, session.user.id);
  }

  @Delete(':id/save')
  @ApiOperation({ summary: 'Remove a listing from favorites' })
  @ApiParam({ name: 'id', description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'Listing unsaved', type: ListingEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  unsave(@Param('id') id: string, @Session() session) {
    return this.listingsService.unsave(id, session.user.id);
  }
}
