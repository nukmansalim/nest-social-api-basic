import { Body, Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import { isNumberObject } from 'util/types';
import { createUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';

@Controller(Routes.USERS)
export class UsersController {
   constructor(@Inject(Services.USERS) private userService: UsersService) { }
   @Get()
   async countUser() {
      return this.userService.countUser()
   }
   @Get()
   async getAllUsers() {
      return this.userService.getAllUsers()
   }
   @Get(":id")
   async getUser(@Param('id', ParseIntPipe) id: number) {
      return this.userService.getUser(id)
   }
   async createUser(@Body() userDetails: createUserDto) {
      return this.userService.createUser(userDetails)
   }

   async deleteUser(@Param('id', ParseIntPipe) id: number) {
      return this.userService.deleteUser(id)
   }
}
