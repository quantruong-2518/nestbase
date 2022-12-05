import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SALT_WORK_FACTOR } from 'common/constants';
import { omit } from 'common/utils';
import { Role } from 'modules/auth/enum/role.enum';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IUser } from './user.model';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User implements IUser {
  public _id: MongooseSchema.Types.ObjectId;

  @Prop()
  public username: string;
  @Prop()
  public email: string;
  @Prop()
  public first_name: string;
  @Prop()
  public last_name: string;
  @Prop()
  public password: string;
  @Prop()
  public avatar: string;
  @Prop({ type: Array, default: [Role.USER] })
  public roles: Role[];
  public comparePasswords: (password: string) => boolean | Promise<boolean>;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  transform: function (doc, ret: IUser) {
    const retJson = omit(ret, ['password']);
    return retJson;
  },
});

UserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});
