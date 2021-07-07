import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
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

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne((type) => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  user: User;
}
