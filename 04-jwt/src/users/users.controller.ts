import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAccessToken } from 'library/guards/auth/jwt/jwt-token.guard';
import { JwtUserId } from 'library/guards/auth/jwt/jwt-user-id.decorators';
import { TokenPayload } from 'library/guards/auth/jwt/type/token.type';
import { UserLoginBodyRequest } from 'src/users/dto/user-login.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() userLoginBodyRequest: UserLoginBodyRequest) {
    return {
      accessToken: await this.usersService.login(userLoginBodyRequest),
    };
  }

  @Get('me')
  @UseGuards(JwtAccessToken)
  async me(@JwtUserId() { userId }: TokenPayload) {
    return {
      userId,
    };
  }
}
