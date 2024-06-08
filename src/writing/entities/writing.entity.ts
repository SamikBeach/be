import { AuthorModel } from 'src/author/entities/author.entity';
import { BookModel } from 'src/book/entities/book.entity';
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
  title_in_kor: string;

  @Column()
  title_in_eng: string;

  @Column()
  publication_date: string;

  @Column()
  publication_date_is_bc: number;

  @ManyToMany(() => BookModel)
  @JoinTable({
    name: 'writing_book',
    joinColumn: { name: 'writing_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
  })
  book: BookModel[];
}
