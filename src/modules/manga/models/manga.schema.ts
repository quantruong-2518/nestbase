import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { WEEKLY_RELEASE_DAY, MANGA_STATUS, READING_TYPE } from './manga.enum';

import { IManga } from './manga.model';

@Schema({ timestamps: true })
export class Manga implements IManga {
  public _id: MongooseSchema.Types.ObjectId;

  @Prop({ unique: true })
  public name: string;
  @Prop()
  public description: string;
  @Prop()
  public weekly_release_day?: WEEKLY_RELEASE_DAY;
  @Prop()
  public avatar: string;
  @Prop()
  public thumbnail: string;
  @Prop()
  public status: MANGA_STATUS;
  @Prop()
  public reading_type: READING_TYPE;
}

export type MangaDocument = Manga & Document;

export const MangaSchema = SchemaFactory.createForClass(Manga);
