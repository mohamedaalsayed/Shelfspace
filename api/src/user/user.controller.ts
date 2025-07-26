import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindManyUsersDto } from './dto/find-many-users.dto';

@Controller('users')
export class UserController {
    constructor (
        private readonly userService: UserService 
    ) {}

    @Get()
    getAllUsers(
        @Query() query: FindManyUsersDto) {
        return this.userService.users({
            skip: query.skip,
            take: query.take,
            cursor: query.cursor ? JSON.parse(query.cursor) : undefined,
            where: query.where ? JSON.parse(query.where) : undefined,
            orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
        });
    }

    @Get(':id')
    getUser(@Param('id') id: Number) {
        this.userService.user({id: +id});
    }

    @Post()
    createUser(@Body() data: CreateUserDto) {
        this.userService.createUser(data);
    }

    @Patch('id')
    updateUser(@Param('id') id: string, @Body() data: CreateUserDto) {
        this.userService.updateUser({ 
            where: {id: +id},
            data 
        });
    }
    
    @Delete('id')
    deleteUser(@Param('id') id: string) {
        this.userService.deleteUser({ id: +id })
    }
}
