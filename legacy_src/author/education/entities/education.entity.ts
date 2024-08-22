import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Education')
export class EducationModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  education: string;
}
