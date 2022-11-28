import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

import {
  MANGA_STATUS,
  READING_TYPE,
  WEEKLY_RELEASE_DAY,
} from '../enums/manga.enum';

import { IManga } from '../models/manga.model';

@ObjectType({ description: 'Manga model' })
export class Manga implements IManga {
  @Field((type) => ID)
  id: string;

  @Field(() => String, { description: 'The name of this manga' })
  @MaxLength(30)
  name: string;

  @Field(() => String, {
    description: 'The description of this manga',
  })
  @MaxLength(200)
  description: string;

  @Field(() => String, {
    description: 'The estimated release date weekly',
    nullable: true,
  })
  @IsOptional()
  weekly_release_day: WEEKLY_RELEASE_DAY;

  @Field(() => String, {
    description: 'The avatar of this manga',
    deprecationReason: 'Not useful in v2 schema',
  })
  avatar: string;

  @Field(() => String, { description: 'The thumbnail of this manga' })
  thumbnail: string;

  @Field(() => Int, { description: 'The status of the manga' })
  status: MANGA_STATUS;

  @Field(() => Int, { description: 'The status of the manga' })
  reading_type: READING_TYPE;
}
