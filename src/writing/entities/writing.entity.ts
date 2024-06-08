import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Writing')
export class WritingModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author_id: number;

  @Column()
  title_in_kor: string;

  @Column()
  title_in_eng: string;

  @Column()
  publication_date: string;

  @Column()
  publication_date_is_bc: number;
}
