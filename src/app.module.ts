import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseConfig, GraphQLConfig, AppConfig } from './configurations';
import { ChapModule, UserModule, MangaModule, AuthModule } from './modules';

const CONFIGURATIONS = [AppConfig, MongooseConfig, GraphQLConfig];
const MODULES = [ChapModule, UserModule, MangaModule, AuthModule];

@Module({
  imports: [...MODULES, ...CONFIGURATIONS],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
