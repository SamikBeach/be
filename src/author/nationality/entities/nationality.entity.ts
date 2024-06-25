import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Nationality')
export class NationalityModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nationality: string;
}
