import { ApiProperty } from '@nestjs/swagger';

export class IStorage {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly address: string;
}
