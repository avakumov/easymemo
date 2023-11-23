import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    //TODO hash password
    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
