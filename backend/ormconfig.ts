import { ConnectionOptions } from 'typeorm';
import * as entities from './src/entity';
import ProductionConfig from './ormconfig.prod';
import DevConfig from './ormconfig.dev';

export default {
  type: 'mysql',
  url: process.env.MYSQL_URL,
  charset: 'utf8mb4',
  entities: Object.values(entities),
  ...(process.env.NODE_ENV === 'production' ? ProductionConfig : DevConfig)
} as ConnectionOptions;
