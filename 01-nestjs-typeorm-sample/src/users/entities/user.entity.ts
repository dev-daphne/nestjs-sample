import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ precision: 0, default: () => 'CURRENT_TIMESTAMP()' })
  created_at: Date;

  @UpdateDateColumn({
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updated_at: Date;

  @DeleteDateColumn({
    precision: 0,
  })
  deleted_at: Date;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  phone_number: string;

  @Column()
  password: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
