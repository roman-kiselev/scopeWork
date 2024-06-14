export interface IUser {
  id: number;
  email: string;
  password: string;
  banned: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
