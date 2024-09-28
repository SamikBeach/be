import { EditionModel } from '@edition/entities/edition.entity';
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

@Entity('edition_comment')
export class EditionCommentModel {
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
  edition_id: number;

  @ManyToOne(() => EditionModel)
  @JoinColumn({ name: 'edition_id' })
  edition: EditionModel;

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

  @OneToMany(() => EditionCommentModel, comment => comment.target_comment_id)
  sub_comments: EditionCommentModel[];

  @ManyToMany(() => UserModel)
  @JoinTable({
    name: 'edition_comment_like',
    joinColumn: {
      name: 'edition_comment_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  liked_users: UserModel[];
}
