import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'modules/auth/enum/role.enum';
import { IUser } from '../models/user.model';

@ObjectType({ description: 'User model' })
export class UserEntity implements IUser {
  @Field(() => ID)
  public id: string;

  @Field()
  public username: string;

  @Field()
  public email: string;

  @Field()
  public first_name: string;

  @Field()
  public last_name: string;

  @Field()
  public avatar: string;

  @Field(() => [String])
  public roles: Role[];

  public password: string;
}
