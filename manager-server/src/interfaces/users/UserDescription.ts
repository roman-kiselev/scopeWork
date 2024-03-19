import { ApiProperty } from '@nestjs/swagger';

export abstract class UserDescription {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly firstname: string;
  @ApiProperty()
  readonly deletedAt: Date | null;
  @ApiProperty()
  readonly lastname: string;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
  @ApiProperty()
  readonly userId: number;
}
