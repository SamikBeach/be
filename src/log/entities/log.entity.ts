import { AuthorCommentModel } from '@author/author_comment/entities/author_comment.entity';
import { AuthorModel } from '@author/entities/author.entity';
import { EditionCommentModel } from '@edition/edition_comment/entities/edition_comment.entity';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { OriginalWorkCommentModel } from '@original_work/original_work_comment/entities/original_work_comment.entity';
import { UserModel } from '@user/entities/user.entity';
import { EditionModel } from 'src/edition/entities/edition.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('log')
export class LogModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @ManyToOne(() => AuthorCommentModel)
  @JoinColumn({ name: 'author_comment_id' })
  author_comment?: AuthorCommentModel;

  @ManyToOne(() => OriginalWorkCommentModel)
  @JoinColumn({ name: 'original_work_comment_id' })
  original_work_comment?: OriginalWorkCommentModel;

  @ManyToOne(() => EditionCommentModel)
  @JoinColumn({ name: 'edition_comment_id' })
  edition_comment?: EditionCommentModel;

  @ManyToOne(() => AuthorModel)
  @JoinColumn({ name: 'target_author_id' })
  target_author?: AuthorModel;

  @ManyToOne(() => OriginalWorkModel)
  @JoinColumn({ name: 'target_original_work_id' })
  target_original_work?: OriginalWorkModel;

  @ManyToOne(() => EditionModel)
  @JoinColumn({ name: 'target_edition_id' })
  target_edition?: EditionModel;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
