import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { FindManyCollectionsDto } from './dto/find-many-collections.dto';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  getAllCollections(@Query() query: FindManyCollectionsDto) {
    return this.collectionService.collections({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  getCollection(@Param('id') id: string) {
    this.collectionService.collection({ id: id });
  }

  @Post()
  createCollection(@Body() data: CreateCollectionDto) {
    this.collectionService.createCollection(data);
  }

  @Patch('id')
  updateCollection(@Param('id') id: string, @Body() data: CreateCollectionDto) {
    this.collectionService.updateCollection({
      where: { id: id },
      data,
    });
  }

  @Delete('id')
  deleteCollection(@Param('id') id: string) {
    this.collectionService.deleteCollection({ id: id });
  }
}
