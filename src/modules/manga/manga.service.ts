import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { CreateMangaInput } from './dto/create-manga.input';
import { UpdateMangaInput } from './dto/update-manga.input';

import { Manga, MangaDocument } from './models/manga.schema';

@Injectable()
export class MangaService {
  constructor(
    @InjectModel(Manga.name) private mangaModel: Model<MangaDocument>,
  ) {}

  public create(createMangaInput: CreateMangaInput) {
    const newManga = new this.mangaModel(createMangaInput);
    return newManga.save();
  }

  public findAll() {
    return this.mangaModel.find().lean().exec();
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
