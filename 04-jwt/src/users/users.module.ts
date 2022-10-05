import { Module } from '@nestjs/common';
import { JwtTokenModule } from 'library/guards/auth/jwt/jwt-token.module';

import { JwtAccessTokenStrategy } from 'library/guards/auth/strategy/jwt-token.strategy';
import { UsersAuthService } from 'src/users/auth/users-auth.service';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [JwtTokenModule],
  providers: [UsersService, UsersAuthService, JwtAccessTokenStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
