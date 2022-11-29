import { AppConfigType } from './envs/env.type';
import { ConfigModule } from '@nestjs/config';

const configuration = async (): Promise<AppConfigType> => {
  const { config } = <{ config: AppConfigType }>(
    await import(`${__dirname}/envs/${process.env.NODE_ENV || 'development'}`)
  );
  return config;
};

export const AppConfig = ConfigModule.forRoot({
  load: [configuration],
});
