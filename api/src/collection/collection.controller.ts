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
  async getAllCollections(@Query() query: FindManyCollectionsDto) {
    return await this.collectionService.collections({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  async getCollection(@Param('id') id: string) {
    await this.collectionService.collection({ id: id });
  }

  @Post()
  async createCollection(@Body() data: CreateCollectionDto) {
    await this.collectionService.createCollection(data);
  }
  
  @Patch('/addItem/:id')
  async addItem(@Body() itemId: string, collectionId: string) {
    await this.collectionService.addItem(itemId, collectionId);
  }

  @Patch('id')
  async updateCollection(@Param('id') id: string, @Body() data: CreateCollectionDto) {
    await this.collectionService.updateCollection({
      where: { id: id },
      data,
    });
  }

  @Delete('id')
  async deleteCollection(@Param('id') id: string) {
    await this.collectionService.deleteCollection({ id: id });
  }
}
