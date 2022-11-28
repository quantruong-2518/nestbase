import {
  WEEKLY_RELEASE_DAY,
  MANGA_STATUS,
  READING_TYPE,
} from '../enums/manga.enum';

export interface IManga {
  name: string;
  description: string;
  weekly_release_day?: WEEKLY_RELEASE_DAY;
  avatar: string;
  thumbnail: string;
  status: MANGA_STATUS;
  reading_type: READING_TYPE;
}
