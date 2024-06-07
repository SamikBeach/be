import { IsEmail, IsString, Length } from 'class-validator';
import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class UserModel extends BaseModel {
  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(3, 12)
  password: string;
}
