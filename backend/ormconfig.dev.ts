export default {
  synchronize: true,
  logging: false,
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'migration'
  }
};
