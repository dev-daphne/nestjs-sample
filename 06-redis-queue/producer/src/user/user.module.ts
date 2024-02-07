import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { UserController } from 'src/user/user.controller';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
