import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaResolver } from './manga.resolver';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [MangaResolver, MangaService],
})
export class MangaModule {}
