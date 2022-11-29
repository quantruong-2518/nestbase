import { config as defaultConfig } from './default';
import { config as developmentConfig } from './development';
import { config as productionConfig } from './production';

type DefaultConfig = typeof defaultConfig;
type DevelopmentConfig = typeof developmentConfig;
type ProductionConfig = typeof productionConfig;

export type AppConfigType = DefaultConfig &
  DevelopmentConfig &
  ProductionConfig;
