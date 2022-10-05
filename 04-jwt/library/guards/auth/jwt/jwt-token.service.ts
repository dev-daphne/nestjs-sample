import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'library/guards/auth/jwt/type/token.type';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });
  }

  decodeAccessToken(accessToken: string) {
    return this.jwtService.verify<TokenPayload>(accessToken, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
