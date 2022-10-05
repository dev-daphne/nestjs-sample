import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessToken extends AuthGuard('jwtAccessToken') {
  handleRequest<TUser>(err: Error, user: TUser, info: any) {
    if (err || info) {
      throw new UnauthorizedException();
    }
    // 토큰이 존재하지 않는다면 validate를 스킵하고 Boolean 타입을 리턴합니다.
    return user;
  }
}
