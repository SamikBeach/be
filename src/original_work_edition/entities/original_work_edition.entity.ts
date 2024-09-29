import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('original_work_edition')
export class OriginalWorkEditionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  edition_id: number;

  @Column()
  @IsNumber()
  original_work_id: number;
}
