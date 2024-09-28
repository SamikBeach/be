import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('edition_like')
export class EditionLikeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  user_id: number;

  @Column()
  @IsNumber()
  edition_id: number;
}
