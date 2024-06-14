import { ApiProperty } from '@nestjs/swagger';
import { Storage as PrismaStorage } from '@prisma/client';

export abstract class Storage implements PrismaStorage {
  @ApiProperty()
  id: number;
  @ApiProperty()
  address: string;
  @ApiProperty()
  name: string;
}
