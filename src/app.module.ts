import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuroraDataApiConnectionOptions } from 'typeorm/driver/aurora-data-api/AuroraDataApiConnectionOptions';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Logger2Middleware } from './middlewares/logger2.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'mysql',
    //       host: config.get<string>('DATABASE_HOST'),
    //       // port: Number(config.get<string>('DATABASE_PORT')),
    //       port: 3308,
    //       username: config.get<string>('DATABASE_USERNAME'),
    //       password: config.get<string>('DATABASE_PASSWORD'),
    //       database: config.get<string>('DATABASE_NAME'),
    //       // database: 'test',
    //       entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //       synchronize: Boolean(config.get<string>('DATABSE_SYNCHRONIZE')),
    //     };
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['dist/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
      migrationsTableName: 'migrations',
    } as AuroraDataApiConnectionOptions),
    UsersModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, Logger2Middleware)
      .exclude({ path: 'users', method: RequestMethod.GET })
      .forRoutes(UsersController);
  }
}
