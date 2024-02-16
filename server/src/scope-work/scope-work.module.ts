import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { NameListModule } from 'src/name_list/name_list.module';
import { ObjectTypeWork } from 'src/objects/objects-type_work.model';
import { Objects } from 'src/objects/objects.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { User } from 'src/user/user.model';
import { ScopeWorkController } from './scope-work.controller';
import { ScopeWork } from './scope-work.model';
import { ScopeWorkService } from './scope-work.service';
import { UserScopeWork } from './user-scope-work.model';

@Module({
  controllers: [ScopeWorkController],
  providers: [ScopeWorkService],
  imports: [
    SequelizeModule.forFeature([
      ScopeWork,
      TypeWork,
      ObjectTypeWork,
      NameList,
      User,
      UserScopeWork,
      ListNameWork,
      Objects,
      TableAddingData,
    ]),
    NameListModule,
    DatabaseModule,
  ],
  exports: [ScopeWorkService],
})
export class ScopeWorkModule {}
