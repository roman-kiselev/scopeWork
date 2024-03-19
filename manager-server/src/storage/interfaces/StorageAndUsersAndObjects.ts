import { ApiProperty } from '@nestjs/swagger';
import { ObjectBuild } from 'src/interfaces/objects/Object';
import { IRole } from 'src/interfaces/roles/IRole';
import { User } from 'src/interfaces/users/User';

export abstract class StorageAndUsersAndObjects {
  @ApiProperty()
  idStorage: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty({
    example: [
      {
        id: 1,
        email: 'nIcYF@example.com',
        banned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '12345',
        roles: [
          {
            id: 1,
            name: 'admin',
            description: 'админ',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          } as IRole,
        ],
      } as User,
    ],
  })
  users: User[];
  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'object',
        address: 'address',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as ObjectBuild,
    ],
  })
  objects: ObjectBuild[];
}
