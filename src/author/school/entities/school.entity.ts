import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('school')
export class SchoolModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  school: string;
}
