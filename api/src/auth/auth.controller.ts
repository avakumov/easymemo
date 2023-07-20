import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>): Promise<any> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
