import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongooseConfig = MongooseModule.forRootAsync(
  {
    imports: [ConfigModule],
    connectionName: 'firstDB',
    useFactory: async (config: ConfigService) => ({
      uri: config.get('DB_URL'),
    }),
    inject: [ConfigService],
  },
  // 'mongodb+srv://wibuland:wibuland123@cluster0.0luieeq.mongodb.net/wibuland?retryWrites=true&w=majority',
);
