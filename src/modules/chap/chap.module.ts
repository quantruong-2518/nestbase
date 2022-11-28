import { Module } from '@nestjs/common';
import { ChapService } from './chap.service';
import { ChapResolver } from './chap.resolver';

@Module({
  providers: [ChapResolver, ChapService]
})
export class ChapModule {}
