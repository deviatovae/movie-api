import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const config: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mongodb',
    url: configService.get('DATABASE_DSN'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
  }),
};

export default config;
