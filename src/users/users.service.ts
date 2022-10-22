import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './user.entity';
import { IUserService } from './user.interface';
import * as bcrypt from "bcrypt"
@Injectable()
export class UsersService implements IUserService {
   constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
   async getAllUsers(): Promise<User[]> {
      return await this.userRepository.find({ select: { password: false } })
   }
   async countUser(): Promise<number> {
      return await this.userRepository.count()
   }
   async getUser(id: any): Promise<User> {
      return await this.userRepository.findOne({
         where: id, select: {
            password: false
         }
      })
   }
   async createUser(dto: createUserDto) {
      const IsExist = await this.userRepository.findOne({
         where: {
            email: dto.email
         }
      })
      if (IsExist) throw new HttpException("User is already exists", HttpStatus.CONFLICT)
      const hashedPass = await bcrypt.hash(dto.password, 10)

      const newUser = this.userRepository.create({
         username: dto.username,
         firstName: dto.firstName,
         lastName: dto.lastName,
         email: dto.email,
         password: hashedPass
      })
      return await this.userRepository.save(newUser)

   }

   async findOneByUsername(username: string, password: string): Promise<any> {
      const user = await this.userRepository.findOneBy({ username })
      if (!user) throw new HttpException("User is not Exists", 400)
      const compared = await bcrypt.compare(password, user.password)
      if (!compared) new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED)
      return user
   }

   async deleteUser(id: number): Promise<any> {
      const deleted = await this.userRepository.delete(id)

      if (deleted) return "Account is succesfully deleted"
   }
}
