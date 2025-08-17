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
  getAllUsers(@Query() query: FindManyUsersDto) {
    return this.userService.users({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: number) {
    return this.userService.user({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() data: CreateUserDto) {
    this.userService.createUser(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateUser(@Param('id') id: string, @Body() data: CreateUserDto) {
    this.userService.updateUser({
      where: { id: +id },
      data,
    });
    return 
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser({ id: +id });
  }
}
