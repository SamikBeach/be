import { AuthorModel } from '@author/entities/author.entity';
import { OriginalWorkCommentModel } from '@original_work/original_work_comment/entities/original_work_comment.entity';
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

  @Column()
  posthumous?: 0 | 1 | null;

  @Column()
  circa?: 0 | 1 | null;

  @Column()
  century?: 0 | 1 | null;

  @Column()
  s?: 0 | 1 | null;

  @ManyToMany(() => UserModel)
  @JoinTable({
    name: 'original_work_like',
    joinColumn: { name: 'original_work_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  liked_users: UserModel[];

  @OneToMany(() => OriginalWorkCommentModel, comment => comment.original_work)
  comments: OriginalWorkCommentModel[];

  @Column()
  @IsNumber()
  like_count: number;

  @Column()
  @IsNumber()
  comment_count: number;

  // @Column()
  editions?: any;
}
