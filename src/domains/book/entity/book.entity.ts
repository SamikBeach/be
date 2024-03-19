import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryColumn('int')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  author: string;

  @Column('text')
  publisher: string;

  @Column('year')
  year_of_publication: string;

  @Column('int')
  sales_quantity: string;
}
