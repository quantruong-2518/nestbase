import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'base/service.base';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
