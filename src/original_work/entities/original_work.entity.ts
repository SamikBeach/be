import { AuthorModel } from '@author/entities/author.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('original_work')
export class OriginalWorkModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author_id: number;

  @ManyToOne(() => AuthorModel)
  @JoinColumn({ name: 'author_id' })
  author: AuthorModel;

  @Column()
  title_in_kor?: string | null;

  @Column()
  title_in_eng?: string | null;

  @Column()
  publication_date?: string | null;

  @Column()
  publication_date_is_bc?: 0 | 1 | null;
}
