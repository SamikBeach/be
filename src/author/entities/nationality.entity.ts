import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthorModel } from './author.entity';

@Entity('Nationality')
export class NationalityModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nationality: string;
}
