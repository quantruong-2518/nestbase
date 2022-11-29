import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { CreateMangaInput } from './dto/create-manga.input';
import { UpdateMangaInput } from './dto/update-manga.input';

import { PaginationArgType } from 'common/pagin/pagin.args';
import { Manga, MangaDocument } from './models/manga.schema';

@Injectable()
export class MangaService {
  constructor(
    @InjectModel(Manga.name)
    private mangaModel: Model<MangaDocument>,
  ) {}

  public async create(createMangaInput: CreateMangaInput) {
    const newManga = new this.mangaModel(createMangaInput);
    return newManga.save();
  }

  public async findAll(filterOptions: PaginationArgType) {
    // TODO: Move to Common
    const page = filterOptions?.page ?? 1;
    const offset = filterOptions?.offset ?? 20;

    return this.mangaModel
      .find()
      .skip(page * offset)
      .limit(offset)
      .lean()
      .exec();
  }

  public findOne(id: MongooseSchema.Types.ObjectId) {
    return this.mangaModel.findById(id).lean().exec();
  }

  public update(id: number, updateMangaInput: UpdateMangaInput) {
    return this.mangaModel
      .findByIdAndUpdate(id, updateMangaInput, { new: true })
      .lean()
      .exec();
  }

  public remove(id: MongooseSchema.Types.ObjectId) {
    return this.mangaModel.findOneAndRemove(id).exec();
  }
}
