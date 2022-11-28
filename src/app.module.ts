import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseConfig, GraphQLConfig } from './configurations';
import { ChapModule, UserModule, MangaModule } from './modules';
import { TestResolver } from './test/test.resolver';
import { Test1Module } from './test1/test1.module';

const CONFIGURATIONS = [MongooseConfig, GraphQLConfig];
const MODULES = [ChapModule, UserModule, MangaModule];

@Module({
  imports: [...MODULES, ...CONFIGURATIONS, Test1Module],
  controllers: [AppController],
  providers: [AppService, TestResolver],
})
export class AppModule {}
