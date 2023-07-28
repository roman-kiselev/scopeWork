export interface IRole {
    id: number;
    name: string;
    description: string;
    deletedAt: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}
