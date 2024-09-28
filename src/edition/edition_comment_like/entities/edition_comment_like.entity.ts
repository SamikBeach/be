import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('edition_comment_like')
export class EditionCommentLikeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  user_id: number;

  @Column()
  @IsNumber()
  edition_comment_id: number;
}
