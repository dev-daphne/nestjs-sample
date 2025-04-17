import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreateUserRequest, CreateUserResponse } from './dto/create-user.dto';
import { GetUserResponse } from './dto/get-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('회원')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '회원 가입',
    description: '이메일 기반 회원 가입을 합니다',
  })
  async createUser(@Body() params: CreateUserRequest) {
    return plainToInstance(
      CreateUserResponse,
      await this.userService.createUser(params),
    );
  }

  @Get(':userId')
  @ApiOperation({
    summary: '회원 조회',
    description: '회원의 정보를 조회합니다',
  })
  async getUserInfo(@Param('userId', ParseIntPipe) userId: number) {
    return plainToInstance(
      GetUserResponse,
      await this.userService.getUserInfo(userId),
    );
  }
}
