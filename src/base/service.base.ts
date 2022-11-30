import { Document, Model, Schema as MongooseSchema } from 'mongoose';

import { getPaginationParameters } from 'common/helpers';
import { PaginationArgType } from 'common/models';

export class BaseService<T, TDocument = T & Document> {
  constructor(private baseModel: Model<TDocument>) {}

  public create<K>(createModelInput: K) {
    const newModel = new this.baseModel(createModelInput);
    return newModel.save();
  }

  public findAll(paginOptions: PaginationArgType) {
    const { page, offset } = getPaginationParameters(paginOptions);

    return this.baseModel
      .find()
      .skip(page * offset)
      .limit(offset)
      .lean()
      .exec();
  }

  public findOne(id: MongooseSchema.Types.ObjectId) {
    return this.baseModel.findById(id).lean().exec();
  }

  public update<K>(id: number, updateModelInput: K) {
    return this.baseModel
      .findByIdAndUpdate(id, updateModelInput, { new: true })
      .lean()
      .exec();
  }

  public remove(id: MongooseSchema.Types.ObjectId) {
    return this.baseModel.findOneAndRemove(id).exec();
  }
}
