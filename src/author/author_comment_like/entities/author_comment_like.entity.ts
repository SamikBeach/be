import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('author_comment_like')
export class AuthorCommentLikeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  user_id: number;

  @Column()
  @IsNumber()
  author_comment_id: number;
}
