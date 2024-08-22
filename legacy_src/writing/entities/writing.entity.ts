import { AuthorModel } from '@author/entities/author.entity';
import { BookModel } from '@book/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Writing')
export class WritingModel {
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

  @ManyToMany(() => BookModel)
  @JoinTable({
    name: 'writing_book',
    joinColumn: { name: 'writing_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
  })
  books: BookModel[];
}
