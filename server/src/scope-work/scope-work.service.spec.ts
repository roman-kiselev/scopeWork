import { ListNameWork } from 'src/list-name-work/list-name-work.model';
import { NameWork } from 'src/name-work/name-work.model';
import { NameList } from 'src/name_list/name-list.model';
import { NameListService } from 'src/name_list/name_list.service';
import { Objects } from 'src/objects/objects.model';
import { TableAddingData } from 'src/table-adding-data/table-adding-data.model';
import { TypeWork } from 'src/type-work/type-work.model';
import { User } from 'src/user/user.model';

import { DatabaseService } from 'src/database/database.service';
import { ScopeWorkController } from './scope-work.controller';
import { ScopeWork } from './scope-work.model';
import { ScopeWorkService } from './scope-work.service';
import { UserScopeWork } from './user-scope-work.model';

describe('Сервис', () => {
  let scopeworkService: ScopeWorkService;
  let scopeworkController: ScopeWorkController;
  let nameListService: NameListService;
  let databaseService: DatabaseService;

  beforeEach(() => {
    nameListService = new NameListService(
      NameList,
      ListNameWork,
      NameWork,
      TableAddingData,
    );
    scopeworkService = new ScopeWorkService(
      ScopeWork,
      UserScopeWork,
      TypeWork,
      ListNameWork,
      User,
      Objects,
      TableAddingData,
      nameListService,
      databaseService,
    );
    scopeworkController = new ScopeWorkController(scopeworkService);
  });

  test('Test 1', async () => {
    const validDtoUser = {
      userId: '1',
    };

    const result = await scopeworkService.getAllScopeWorkSqlShort(
      validDtoUser.userId,
    );
    expect(result).toBeDefined();
  });

  test('Что то', async () => {
    // Генерация входных данных для теста
    const validDto = {
      idScopeWork: 1,
      dateFrom: '2024.01.01',
      dateTo: '2024.02.16',
    };

    // Выполнение метода и получение результата
    const result = await scopeworkService.getHistoryTimeline(validDto);

    // Проверка, что результат не пустой и содержит корректные данные
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    // Дополнительные проверки на корректность данных, если необходимо
  });

  // test('Тест ошибка', async () => {
  //   // Генерация невалидных входных данных для теста
  //   const invalidDto = {
  //     idScopeWork: 1, // Пример невалидного idScopeWork
  //     dateFrom: 'invalid-date', // Пример невалидной даты
  //     dateTo: '2022-12-31',
  //   };

  //   // Проверка, что метод выбрасывает HttpException при передаче невалидных данных
  //   await expect(
  //     scopeworkService.getHistoryTimeline(invalidDto),
  //   ).rejects.toThrow(HttpException);
  // });
});
