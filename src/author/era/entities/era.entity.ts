import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Era')
export class EraModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  era: string;
}
