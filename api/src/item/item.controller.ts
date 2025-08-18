import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async getAllItems(@Query() query: FindManyItemsDto) {
    return await this.itemService.items({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getItem(@Param('id') id: string) {
    await this.itemService.item({ id: id });
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getUserItems(@Param('userId') userId: number, @Query() query: FindManyItemsDto) {
    return await this.itemService.userItems(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createItem(@Body() data: CreateItemDto) {
    await this.itemService.createItem(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateItem(@Param('id') id: string, @Body() data: CreateItemDto) {
    await this.itemService.updateItem({
      where: { id: id },
      data,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') id: string) {
    await this.itemService.deleteItem({ id: id });
  }
}
