import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerModule } from '@nestjs/throttler';
import { Redis } from 'ioredis';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ListNameWorkModule } from './list-name-work/list-name-work.module';
import { NameWorkModule } from './name-work/name-work.module';
import { NameListModule } from './name_list/name_list.module';
import { ObjectsModule } from './objects/objects.module';
import { RedisModule } from './redis/redis.module';
import { RolesModule } from './roles/roles.module';
import { ScopeWorkModule } from './scope-work/scope-work.module';
import { TableAddingDataModule } from './table-adding-data/table-adding-data.module';
import { TypeWorkModule } from './type-work/type-work.module';
import { UnitModule } from './unit/unit.module';
import { UserDescriptionModule } from './user-description/user-description.module';
import { UserModule } from './user/user.module';

console.log(process.env.REDIS_HOST, Number(process.env.REDIS_PORT));
@Module({
  imports: [
    // CacheModule.register({
    //   ttl: 60,
    //   isGlobal: true,
    // }),
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      timezone: '+03:00',
      models: [],
      autoLoadModels: true,
      synchronize: true,
      //sync: { force: true },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
      storage: new ThrottlerStorageRedisService(
        new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        }),
      ),
    }),

    UserModule,
    AuthModule,
    RolesModule,
    UserDescriptionModule,
    ObjectsModule,
    TypeWorkModule,
    ScopeWorkModule,
    NameWorkModule,
    UnitModule,
    ListNameWorkModule,
    NameListModule,
    TableAddingDataModule,
    DatabaseModule,
    RedisModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
