import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ListNameWorkModule } from './list-name-work/list-name-work.module';
import { ListWorkModule } from './list-work/list-work.module';
import { LogListWorkModule } from './log-list-work/log-list-work.module';
import { NameWorkModule } from './name-work/name-work.module';
import { NameListModule } from './name_list/name_list.module';
import { ObjectsModule } from './objects/objects.module';
import { RolesModule } from './roles/roles.module';
import { ScopeWorkModule } from './scope-work/scope-work.module';
import { TotalVolumeModule } from './total-volume/total-volume.module';
import { TypeWorkModule } from './type-work/type-work.module';
import { UnitModule } from './unit/unit.module';
import { UserDescriptionModule } from './user-description/user-description.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
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
      //timezone: '+03:00',
      models: [],
      autoLoadModels: true,
      synchronize: true,
      //sync: { force: true },
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
    TotalVolumeModule,
    ListWorkModule,
    LogListWorkModule,
    ListNameWorkModule,
    NameListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
