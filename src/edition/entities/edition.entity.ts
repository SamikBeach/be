import { AuthorModel } from '@author/entities/author.entity';
import { EditionCommentModel } from '@edition/edition_comment/entities/edition_comment.entity';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { OriginalWorkEditionModel } from '@original_work_edition/entities/original_work_edition.entity';
import { UserModel } from '@user/entities/user.entity';
import { IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('edition')
export class EditionModel {
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
  image_url: string;

  @Column()
  publication_date: string;

  @Column()
  publisher: string;

  @Column()
  isbn: string;

  @Column()
  isbn13: string;

  @ManyToMany(() => UserModel)
  @JoinTable({
    name: 'edition_like',
    joinColumn: { name: 'edition_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  liked_users: UserModel[];

  @ManyToMany(() => OriginalWorkModel)
  @JoinTable({
    name: 'original_work_edition',
    joinColumn: { name: 'edition_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'original_work_id', referencedColumnName: 'id' },
  })
  original_works: OriginalWorkModel[];

  @OneToMany(() => EditionCommentModel, comment => comment.edition)
  comments: EditionCommentModel[];

  @Column()
  @IsNumber()
  like_count: number;

  @Column()
  @IsNumber()
  comment_count: number;
}
