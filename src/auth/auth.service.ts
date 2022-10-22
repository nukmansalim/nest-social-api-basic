import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Services } from 'src/utils/contants';

@Injectable()
export class AuthService {
   constructor(@Inject(Services.USERS) private usersService: UsersService) { }
   async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOneByUsername(username, pass);
      if (user) {
         const { password, ...results } = user
         return results
      }
      return null;
   }
}
