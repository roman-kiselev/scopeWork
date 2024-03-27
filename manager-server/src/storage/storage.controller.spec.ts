import { forwardRef } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { Storage } from './interfaces/Storage';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

describe('StorageController', () => {
  let controllerStorage: StorageController;
  let storageService: StorageService;
  let databaseModule: DatabaseModule;
  let prismaService: DatabaseService;
  let client: ClientProxy;

  let idStorage = '';

  const mockClientProxy = {};
  const mockStorageService = {
    findOneStorage: jest.fn((id: string) => {
      let data: Storage = {
        id: +id,
        name: 'storage',
        address: 'address',
      };
      return data;
    }),
    createStorage: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageController],
      providers: [
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
      ],
      imports: [
        forwardRef(() =>
          ClientsModule.register([
            {
              name: 'STORAGE_SERVICE',
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://localhost:5672'],
                queue: 'scopework_queue',
                queueOptions: {
                  durable: true,
                },
              },
            },
          ]),
        ),
      ],
    }).compile();

    controllerStorage = module.get<StorageController>(StorageController);
    storageService = module.get<StorageService>(StorageService);

    const result = await storageService.createStorage({
      name: 'Основной',
      address: 'г. Пенза',
      objectId: '1',
      userId: '2',
    });
    if (result instanceof Storage) {
      idStorage = result.id.toString();
    }
  });

  it('ControllerStorage определён', () => {
    expect(controllerStorage).toBeDefined();
  });

  it('GetById', async () => {
    const result = await controllerStorage.getOneStorageById(idStorage);

    expect(result).toBeDefined();
    expect(result.idStorage).toEqual(idStorage);
  });
});
