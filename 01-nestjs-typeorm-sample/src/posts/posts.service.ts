import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, CreatePostOutput } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<CreatePostOutput> {
    try {
      const { title, content, author_id } = createPostDto;
      const user = await this.users.findOne({ id: author_id });

      if (!user) {
        return { message: 'not found user' };
      }

      await this.posts.save({ user, title, content });
      return { message: 'success' };
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      const posts = await this.posts.find();
      return { posts };
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.posts.findOne({ id });

      if (!post) {
        return { message: 'not found post' };
      }
      return { post };
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.posts.findOne({ id });

      if (!post) {
        return { message: 'not found post' };
      }

      await this.posts.save({
        ...post,
        ...updatePostDto,
      });
      return { message: 'success' };
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number) {
    try {
      const post = await this.posts.findOne({ id });

      if (!post) {
        return { message: 'not found post' };
      }

      await this.posts.remove(post);

      return { message: 'success' };
    } catch (err) {
      throw new Error(err);
    }
  }
}
