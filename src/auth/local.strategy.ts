import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Services } from "src/utils/contants";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(@Inject(Services.AUTH) private authService: AuthService) {
      super()
   }

   async validate(username: string, password: string) {
      const user = await this.authService.validateUser(username, password)
      if (!user) throw new UnauthorizedException()
      return user
   }
}