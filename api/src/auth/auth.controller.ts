import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from "@nestjs/common";
import { RequestExtended } from "src/entities/request";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { Public } from "./decorators";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>): Promise<any> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get("profile")
  async getProfile(@Request() req: RequestExtended) {
    const user = await this.userService.findOne({ id: req.user.userId });

    return {
      ...user,
      entities: ["questions", "categories", ...(user.isAdmin ? ["users"] : [])],
    };
  }
}
