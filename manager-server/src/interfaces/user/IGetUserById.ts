import { IRole } from '../roles/IRole';
import { IUserDescription } from './IUserDescription';

export interface IGetUserById {
  id: number;
  email: string;
  password: string;
  banned: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userDescription: IUserDescription;
  roles: IRole[];
}
