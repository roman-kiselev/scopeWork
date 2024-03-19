import { ApiProperty } from '@nestjs/swagger';

export abstract class ObjectBuild {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly address: string;
  @ApiProperty()
  readonly deletedAt: Date | null;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
}
