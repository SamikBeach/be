import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('report')
export class ReportModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @Column()
  @IsNumber()
  origin_type_id: number;

  @Column()
  @IsNumber()
  type_id: number;

  @Column()
  @IsString()
  @IsOptional()
  description?: string;

  @CreateDateColumn()
  created_at: Date = new Date();
}
