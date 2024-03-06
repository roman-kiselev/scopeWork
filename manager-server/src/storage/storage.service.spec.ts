import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { IStorage } from './interfaces/IStorage';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;
  let prismaService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService, DatabaseService],
    }).compile();

    storageService = module.get<StorageService>(StorageService);
    prismaService = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(async () => {
    const storage = await prismaService.storage.findMany();

    for (const { id } of storage) {
      await prismaService.objectStorage.deleteMany({
        where: {
          storageId: id,
        },
      });

      await prismaService.userStorage.deleteMany({
        where: {
          storageId: id,
        },
      });
      await prismaService.storage.deleteMany({
        where: {
          id: id,
        },
      });
    }
  });

  it('Определен сервис', () => {
    expect(storageService).toBeDefined();
  });

  describe('Создание склада (все значения)', () => {
    it('Полное DTO', async () => {
      // Arrange
      const dto: CreateStorageDto = {
        name: 'Основной',
        address: 'г. Пенза',
        objectId: '1',
        userId: '1',
      };

      // Act
      const result = await storageService.createStorage(dto);

      // Assert
      if (result instanceof IStorage) {
        expect(result).toBeDefined();
        expect(result.name).toBe('Основной');
        expect(result.address).toBe('г. Пенза');
      }
    });

    it('Не переданы objectId and userId', async () => {
      // Arrange
      const dto: CreateStorageDto = {
        name: 'Основной',
        address: 'г. Пенза',
      };

      // Act
      const result = await storageService.createStorage(dto);

      if (result instanceof IStorage) {
        expect(result).toBeDefined();
        expect(result.name).toBe('Основной');
        expect(result.address).toBe('г. Пенза');
      }
    });

    it('Не передан userId', async () => {
      // Arrange
      const dto: CreateStorageDto = {
        name: 'Основной',
        address: 'г. Пенза',
        objectId: '1',
      };

      // Act
      const result = await storageService.createStorage(dto);

      // Assert
      if (result instanceof IStorage) {
        expect(result).toBeDefined();
        expect(result.name).toBe('Основной');
        expect(result.address).toBe('г. Пенза');
      }
    });

    it('Если форма пуста', async () => {
      // Arrange
      const dto: CreateStorageDto = {
        name: '',
        address: '',
      };

      // Act
      try {
        await storageService.createStorage(dto);
        fail('Ожидалась ошибка, но получен успешный результат');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Отсутсвуют данные для создания склада');
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
