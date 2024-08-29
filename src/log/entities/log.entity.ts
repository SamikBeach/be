import { AuthorCommentModel } from '@author/author_comment/entities/author_comment.entity';
import { AuthorModel } from '@author/entities/author.entity';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { OriginalWorkCommentModel } from '@original_work/original_work_comment/entities/original_work_comment.entity';
import { UserModel } from '@user/entities/user.entity';
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
  @ManyToOne(() => OriginalWorkCommentModel)
  @JoinColumn({ name: 'comment_id' })
  comment?: AuthorCommentModel | OriginalWorkCommentModel;

  @ManyToOne(() => AuthorModel)
  @JoinColumn({ name: 'target_author_id' })
  target_author?: AuthorModel;

  @ManyToOne(() => OriginalWorkModel)
  @JoinColumn({ name: 'target_original_work_id' })
  target_original_work?: OriginalWorkModel;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
