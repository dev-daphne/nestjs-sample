import { Injectable } from '@nestjs/common';
import { UsersAuthService } from 'src/users/auth/users-auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  async login({ id, password }) {
    // 유저 패스워드 체크
    // userId 획득
    const userId = 1; // 임시 값

    return this.usersAuthService.createGenerateAccessToken({ userId });
  }
}
