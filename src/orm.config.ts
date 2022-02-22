import { join } from 'path';

require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  autoLoadEntities: true,
  synchronize: false,
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migrations',
  },
  entities: [
    join(__dirname, './**/*.entity{.ts,.js}'),
  ],
  subscribers: [
    join(__dirname, './**/*.subscriber{.ts,.js}'),
  ],
  migrations: [
    join(__dirname, './migrations/*{.ts,.js}'),
  ],
};