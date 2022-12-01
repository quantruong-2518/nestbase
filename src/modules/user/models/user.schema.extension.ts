import { SALT_WORK_FACTOR } from 'common/constants';
import { omit } from 'common/utils';
import { IUser } from './user.model';
import { UserSchema } from './user.schema';
import bcrypt from 'bcrypt';

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

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
