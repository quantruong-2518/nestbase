import {
  Document,
  FilterQuery,
  Model,
  Schema as MongooseSchema,
} from 'mongoose';

import { getPaginationParameters } from 'common/helpers';
import { PaginationArgType } from 'common/models';

export class BaseService<T, TDocument = T & Document> {
  constructor(protected model: Model<TDocument>) {}

  public create<K>(createModelInput: K) {
    const newModel = new this.model(createModelInput);
    return newModel.save();
  }

  public findAll(paginOptions: PaginationArgType) {
    const { page, offset } = getPaginationParameters(paginOptions);

    return this.model
      .find()
      .skip(page * offset)
      .limit(offset)
      .lean()
      .exec();
  }

  public findOne(filterOptions: FilterQuery<TDocument>) {
    return this.model.findOne(filterOptions, { password: 0 }).lean().exec();
  }

  public findOneById(id: string) {
    return this.model.findById(id).lean().exec();
  }

  public update<K>(id: number, updateModelInput: K) {
    return this.model
      .findByIdAndUpdate(id, updateModelInput, { new: true })
      .lean()
      .exec();
  }

  public remove(id: MongooseSchema.Types.ObjectId) {
    return this.model.findOneAndRemove(id).exec();
  }
}
