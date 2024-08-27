import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('original_work_like')
export class OriginalWorkLikeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  user_id: number;

  @Column()
  @IsNumber()
  original_work_id: number;
}
