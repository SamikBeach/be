import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('author_comment')
export class AuthorCommentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  user_id: number;

  @Column()
  @IsString()
  comment: string;

  @Column()
  @IsNumber()
  author_id: number;

  @Column()
  target_comment_id?: number;

  @Column()
  target_user_id?: number;

  @Column()
  @IsNumber()
  like_count: number = 0;

  @Column()
  @IsNumber()
  comment_count: number = 0;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
