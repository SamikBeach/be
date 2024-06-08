import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('main_interest')
export class MainInterestModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  main_interest: string;
}
