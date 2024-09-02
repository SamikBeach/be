import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { UserModel } from '@user/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('original_work_comment')
export class OriginalWorkCommentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @Column()
  @IsString()
  comment: string;

  @Column()
  @IsNumber()
  original_work_id: number;

  @ManyToOne(() => OriginalWorkModel)
  @JoinColumn({ name: 'original_work_id' })
  original_work: OriginalWorkModel;

  @Column()
  target_comment_id?: number;

  @Column()
  target_user_id?: number;

  @Column()
  @IsNumber()
  like_count: number = 0;

  @Column()
  @IsNumber()
  comment_count: number = 0;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();

  @OneToMany(
    () => OriginalWorkCommentModel,
    comment => comment.target_comment_id
  )
  sub_comments: OriginalWorkCommentModel[];

  @ManyToMany(() => UserModel)
  @JoinTable({
    name: 'original_work_comment_like',
    joinColumn: {
      name: 'original_work_comment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  liked_users: UserModel[];
}
