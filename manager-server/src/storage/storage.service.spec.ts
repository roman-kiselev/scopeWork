import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let serviceStorage: StorageService;
  let client: ClientProxy;
  const mockDatabaseService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    serviceStorage = module.get<StorageService>(StorageService);
  });

  it('ServiceStorage определён', () => {
    expect(serviceStorage).toBeDefined();
  });
});

// describe('StorageService', () => {
//   let storageService: StorageService;
//   let prismaService: DatabaseService;

//   const mockStorageService = {
//     create: jest.fn((dto) => {
//       return {
//         ...dto,
//       };
//     }),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [StorageService, DatabaseService],
//     })
//       .overrideProvider(StorageService)
//       .useValue(mockStorageService)
//       .compile();

//     storageService = module.get<StorageService>(StorageService);
//     prismaService = module.get<DatabaseService>(DatabaseService);
//   });

//   afterEach(async () => {
//     const storage = await prismaService.storage.findMany();

//     for (const { id } of storage) {
//       await prismaService.objectStorage.deleteMany({
//         where: {
//           storageId: id,
//         },
//       });

//       await prismaService.userStorage.deleteMany({
//         where: {
//           storageId: id,
//         },
//       });
//       await prismaService.storage.deleteMany({
//         where: {
//           id: id,
//         },
//       });
//     }
//   });

//   it('Определен сервис', () => {
//     expect(storageService).toBeDefined();
//   });

//   describe('Создание склада (все значения)', () => {
//     it('Полное DTO', async () => {
//       // Arrange
//       const dto: CreateStorageDto = {
//         name: 'Основной',
//         address: 'г. Пенза',
//         objectId: '1',
//         userId: '1',
//       };

//       // Act

//       const result = await storageService.createStorage(dto);

//       // Assert
//       if (result instanceof Storage) {
//         expect(result).toBeDefined();
//         expect(result.name).toBe('Основной');
//         expect(result.address).toBe('г. Пенза');
//       }
//     });

//     // it('Не переданы objectId and userId', async () => {
//     //   // Arrange
//     //   const dto: CreateStorageDto = {
//     //     name: 'Основной',
//     //     address: 'г. Пенза',
//     //   };
//     //   try {
//     //     // Act
//     //     const result = await storageService.createStorage(dto);

//     //     if (result instanceof Storage) {
//     //       expect(result).toBeDefined();
//     //       expect(result.name).toBe('Основной');
//     //       expect(result.address).toBe('г. Пенза');
//     //     }
//     //   } catch (e) {
//     //     console.log(e);
//     //   }
//     // });

//     // it('Не передан userId', async () => {
//     //   // Arrange
//     //   const dto: CreateStorageDto = {
//     //     name: 'Основной',
//     //     address: 'г. Пенза',
//     //     objectId: '1',
//     //   };

//     //   try {
//     //     const result = await storageService.createStorage(dto);

//     //     // Assert
//     //     if (result instanceof Storage) {
//     //       expect(result).toBeDefined();
//     //       expect(result.name).toBe('Основной');
//     //       expect(result.address).toBe('г. Пенза');
//     //     }
//     //   } catch (e) {
//     //     console.log(e);
//     //   }
//     //   // Act
//     // });

//     // it('Если форма пуста', async () => {
//     //   // Arrange
//     //   const dto: CreateStorageDto = {
//     //     name: '',
//     //     address: '',
//     //   };

//     //   // Act
//     //   try {
//     //     await storageService.createStorage(dto);
//     //     fail('Ожидалась ошибка, но получен успешный результат');
//     //   } catch (e) {
//     //     expect(e).toBeInstanceOf(HttpException);
//     //     expect(e.message).toBe('Отсутсвуют данные для создания склада');
//     //     expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
//     //   }
//     // });
//   });

//   // describe('Обновляем состояние склада', () => {
//   //   it('Полное DTO', async () => {
//   //     // Сначала создаём
//   //     const dto: CreateStorageDto = {
//   //       name: 'Основной',
//   //       address: 'г. Пенза',
//   //       objectId: '1',
//   //       userId: '1',
//   //     };
//   //     let editDto: EditStorageDto | null = null;
//   //     try {
//   //       const result = await storageService.createStorage(dto);
//   //       if (result instanceof Storage) {
//   //         editDto = {
//   //           id: result.id,
//   //           name: 'Основной 1',
//   //           address: 'г. П',
//   //           objectId: '2',
//   //           userId: '2',
//   //         };
//   //       }

//   //       const result2 = await storageService.editStorageDescription(editDto);
//   //       expect(result2).toBeDefined();
//   //       expect(result2.name).toBe('Основной 1');
//   //       expect(result2.address).toBe('г. П');
//   //       expect(result2.UserStorage[0].userId).toBe('2');
//   //       expect(result2.ObjectStorage[0].objectId).toBe('2');
//   //     } catch (e) {
//   //       console.log(e);
//   //     }
//   //   });
//   // });
// });
