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
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { FindManyItemsDto } from './dto/find-many-items.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getAllItems(@Query() query: FindManyItemsDto) {
    return this.itemService.items({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  getItem(@Param('id') id: string) {
    this.itemService.item({ id: id });
  }

  @Post()
  createItem(@Body() data: CreateItemDto) {
    this.itemService.createItem(data);
  }

  @Patch('id')
  updateItem(@Param('id') id: string, @Body() data: CreateItemDto) {
    this.itemService.updateItem({
      where: { id: id },
      data,
    });
  }

  @Delete('id')
  deleteItem(@Param('id') id: string) {
    this.itemService.deleteItem({ id: id });
  }
}
