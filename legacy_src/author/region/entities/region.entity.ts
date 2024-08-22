import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region')
export class RegionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;
}
