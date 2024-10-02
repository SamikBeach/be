import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type')
export class TypeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  type: string;
}
