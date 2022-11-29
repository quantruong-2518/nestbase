import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import {
  WEEKLY_RELEASE_DAY,
  MANGA_STATUS,
  READING_TYPE,
} from '../enums/manga.enum';

import { IManga } from '../models/manga.model';

@InputType({ description: 'Manga model for creation' })
export class CreateMangaInput implements IManga {
  @Field(() => String, { description: 'The name of this manga' })
  @MaxLength(30)
  public name: string;

  @Field(() => String, {
    description: 'The description of this manga',
  })
  @MaxLength(200)
  public description: string;

  @Field(() => String, {
    description: 'The estimated release date weekly',
    nullable: true,
  })
  @IsOptional()
  public weekly_release_day: WEEKLY_RELEASE_DAY;

  @Field(() => String, {
    description: 'The avatar of this manga',
    deprecationReason: 'Not useful in v2 schema',
  })
  public avatar: string;

  @Field(() => String, { description: 'The thumbnail of this manga' })
  public thumbnail: string;

  @Field(() => Int, { description: 'The status of the manga' })
  public status: MANGA_STATUS;

  @Field(() => Int, { description: 'The status of the manga' })
  public reading_type: READING_TYPE;
}
