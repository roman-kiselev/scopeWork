import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { ProviderService } from './provider.service';

describe('ProviderService', () => {
  let service: ProviderService;
  let prismaService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderService, DatabaseService],
    }).compile();

    service = module.get<ProviderService>(ProviderService);
    prismaService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
