import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserParams } from './user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /** 유저 생성 */
  async createUser({ name, email }: CreateUserParams) {
    const user = await this.userRepository.findUserByEmail(email);
    if (user) throw new BadRequestException('이미 가입된 유저입니다.');

    const { id } = await this.userRepository.createUser(name, email);

    return { id };
  }
  /** 유저 조회 */

  async getUserInfo(userId: number) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    return user;
  }
}
