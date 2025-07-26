import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor (
        private readonly userService: UserService 
    ) {}

    @Get()
    getAllUsers(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('cursor') cursor?: string,
        @Query('where') where?: string,
        @Query('orderBy') orderBy?: string,
    ) {
        return this.userService.users({
            skip: skip ? +skip : undefined,
            take: take ? +take : undefined,
            cursor: cursor ? JSON.parse(cursor) : undefined,
            where: where ? JSON.parse(where) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy) : undefined,
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
    updateUser(@Param('id') id: String, @Body() data: CreateUserDto) {
        this.userService.updateUser({ 
            where: {id: +id},
            data 
        });
    }
    
    @Delete('id')
    deleteUser(@Param('id') id: String) {
        this.userService.deleteUser({ id: +id })
    }
}
