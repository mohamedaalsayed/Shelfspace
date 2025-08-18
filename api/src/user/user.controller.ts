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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindManyUsersDto } from './dto/find-many-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() query: FindManyUsersDto) {
    return await this.userService.users({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: number) {
    return await this.userService.user({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() data: CreateUserDto) {
    await this.userService.createUser(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(@Param('id') id: string, @Body() data: CreateUserDto) {
    await this.userService.updateUser({
      where: { id: +id },
      data,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser({ id: +id });
  }
}
