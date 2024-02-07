import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  /** 유저 생성 */
  async createUser(name: string, email: string) {
    return this.prisma.user.create({ data: { name, email } });
  }

  /** 이메일 기반 유저 조회 */
  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  /** 회원 ID 기반 유저 조회 */
  async findUserById(userId: number) {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }
}
