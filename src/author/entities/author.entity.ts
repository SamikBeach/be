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
import { EraModel } from '../era/entities/era.entity';
import { UserModel } from '@user/entities/user.entity';
import { AuthorCommentModel } from '@author/author_comment/entities/author_comment.entity';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { IsNumber } from 'class-validator';
import { EditionModel } from '@edition/entities/edition.entity';

@Entity('Author')
export class AuthorModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_in_kor: string;

  @Column()
  image_url: string;

  @Column()
  born_date: string;

  @Column()
  born_date_is_bc: number;

  @Column()
  died_date: string;

  @Column()
  died_date_is_bc: number;

  @ManyToOne(() => EraModel)
  @JoinColumn({ name: 'era_id' })
  era: EraModel;

  @ManyToMany(() => UserModel)
  @JoinTable({
    name: 'author_like',
    joinColumn: { name: 'author_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  liked_users: UserModel[];

  @OneToMany(() => AuthorCommentModel, comment => comment.author)
  comments: AuthorCommentModel[];

  @OneToMany(() => OriginalWorkModel, originalWork => originalWork.author)
  original_works: OriginalWorkModel[];

  @Column()
  @IsNumber()
  like_count: number = 0;

  @Column()
  @IsNumber()
  comment_count: number = 0;

  @OneToMany(() => EditionModel, edition => edition.author)
  editions: EditionModel[];
}
