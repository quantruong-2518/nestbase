import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaResolver } from './manga.resolver';
import { Manga, MangaSchema } from './models/manga.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Manga.name, schema: MangaSchema }]),
  ],
  providers: [MangaResolver, MangaService],
})
export class MangaModule {}
