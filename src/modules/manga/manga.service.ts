import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'base/service.base';
import { Model } from 'mongoose';

import { Manga, MangaDocument } from './models/manga.schema';

@Injectable()
export class MangaService extends BaseService<Manga> {
  constructor(
    @InjectModel(Manga.name)
    mangaModel: Model<MangaDocument>,
  ) {
    super(mangaModel);
  }
}
