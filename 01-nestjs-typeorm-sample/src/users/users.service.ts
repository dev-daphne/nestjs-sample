import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      await this.users.save(createUserDto);
      return { message: 'success' };
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.users.findOne({ where: { id } });

      if (!user) {
        return { message: 'not found user' };
      }
      return { user };
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.users.findOne({ where: { id } });

      if (!user) {
        return { message: 'not found user' };
      }

      await this.users.save({
        ...user,
        ...updateUserDto,
      });
      return { message: 'success' };
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.users.findOne({ where: { id } });

      if (!user) {
        return { message: 'not found user' };
      }

      await this.users.remove(user);

      return { message: 'success' };
    } catch (err) {
      throw new Error(err);
    }
  }
}
