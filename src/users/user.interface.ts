import { createUserDto } from "./dtos/createUser.dto"
import { User } from "./user.entity"

export interface IUserService {
   getAllUsers(): Promise<User[]>
   getUser(id: any): Promise<User>
   countUser(): Promise<number>
   createUser(dto: createUserDto): Promise<any>
   deleteUser(id: number): Promise<any>
   findOneByUsername(username: string, password: string): Promise<any>
}