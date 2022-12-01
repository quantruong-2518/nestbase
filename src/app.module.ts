import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { MongooseConfig, GraphQLConfig, AppConfig } from './configurations';
import { MangaModule, AuthModule, UserModule } from './modules';

const CONFIGURATIONS = [AppConfig, MongooseConfig, GraphQLConfig];
const MODULES = [MangaModule, AuthModule, UserModule];

@Module({
  imports: [...MODULES, ...CONFIGURATIONS],
  controllers: [AppController],
})
export class AppModule {}
