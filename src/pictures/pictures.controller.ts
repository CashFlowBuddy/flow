import { Controller, Get, Post, Body, Param, Delete, Query, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { PictureEntity } from './entities/picture.entity';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@ApiTags('Pictures')
@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadDir = join(process.cwd(), 'uploads', 'listings');
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
          cb(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Only image files are allowed'), false);
          return;
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @ApiOperation({ summary: 'Upload an image file for a listing' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        listingId: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
      required: ['listingId', 'file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Picture uploaded', type: PictureEntity })
  @ApiResponse({ status: 400, description: 'Invalid file input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  upload(
    @UploadedFile() file: any,
    @Body('listingId') listingId: string,
    @Session() session,
  ) {
    if (!listingId) {
      throw new BadRequestException('listingId is required');
    }
    if (!file) {
      throw new BadRequestException('file is required');
    }
    const url = `/uploads/listings/${file.filename}`;
    return this.picturesService.create({ url, listingId }, session.user.id);
  }

  @AllowAnonymous()
  @Get()
  @ApiOperation({ summary: 'Get all pictures for a listing' })
  @ApiQuery({ name: 'listingId', required: true, description: 'Listing ID' })
  @ApiResponse({ status: 200, description: 'List of pictures', type: PictureEntity, isArray: true })
  findByListing(@Query('listingId') listingId: string) {
    return this.picturesService.findByListing(listingId);
  }

  @AllowAnonymous()
  @Get(':id')
  @ApiOperation({ summary: 'Get a picture by ID' })
  @ApiParam({ name: 'id', description: 'Picture ID' })
  @ApiResponse({ status: 200, description: 'The picture', type: PictureEntity })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a picture' })
  @ApiParam({ name: 'id', description: 'Picture ID' })
  @ApiResponse({ status: 200, description: 'Picture deleted', type: PictureEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  remove(@Param('id') id: string, @Session() session) {
    return this.picturesService.remove(id, session.user.id);
  }
}
