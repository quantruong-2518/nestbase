import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'modules/auth/auth.module';
import { MangaResolver } from './manga.resolver';
import { MangaService } from './manga.service';
import { Manga, MangaSchema } from './models/manga.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Manga.name,
        schema: MangaSchema,
      },
    ]),
  ],
  providers: [MangaResolver, MangaService],
})
export class MangaModule {}
