import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('era')
export class EraModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'era' })
  era: string;

  @Column({ name: 'era_in_kor' })
  era_in_kor: string;
}
