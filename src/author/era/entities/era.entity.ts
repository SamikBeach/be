import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('era')
export class EraModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'era' })
  era: string;
}
