import { Injectable } from '@nestjs/common';
import { JwtTokenService } from 'library/guards/auth/jwt/jwt-token.service';
import { TokenPayload } from 'library/guards/auth/jwt/type/token.type';

@Injectable()
export class UsersAuthService {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async createGenerateAccessToken(payload: TokenPayload) {
    return this.jwtTokenService.generateAccessToken(payload);
  }
}
