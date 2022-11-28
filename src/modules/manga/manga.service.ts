import { Injectable } from '@nestjs/common';
import { CreateMangaInput } from './dto/create-manga.input';
import { UpdateMangaInput } from './dto/update-manga.input';

import {
  MANGA_STATUS,
  READING_TYPE,
  WEEKLY_RELEASE_DAY,
} from './enums/manga.enum';

import { IManga } from './models/manga.model';

const DEFAULT_ARRAY = [
  {
    name: 'One piece',
    avatar: 'avatar1',
    description: 'description1',
    status: MANGA_STATUS.IN_PROGRESS,
    reading_type: READING_TYPE.COMIC,
    thumbnail: '',
    weekly_release_day: WEEKLY_RELEASE_DAY.TUESDAY,
  },
  {
    name: 'Naruto',
    avatar: 'avatar2',
    description: 'description2',
    status: MANGA_STATUS.DONE,
    reading_type: READING_TYPE.COMIC,
    thumbnail: '',
    weekly_release_day: WEEKLY_RELEASE_DAY.MON,
  },
];

@Injectable()
export class MangaService {
  create(createMangaInput: CreateMangaInput) {
    DEFAULT_ARRAY.push(createMangaInput);

    console.log('createMangaInput', createMangaInput);

    return createMangaInput;
  }

  findAll(): Array<IManga> {
    return DEFAULT_ARRAY;
  }

  findOne(id: number) {
    return `This action returns a #${id} manga`;
  }

  update(id: number, updateMangaInput: UpdateMangaInput) {
    return `This action updates a #${id} manga`;
  }

  remove(id: number) {
    return `This action removes a #${id} manga`;
  }
}
