export interface ITypeWork {
    id: number;
    name: string;
    description: string;
    deletedAt: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    // objects: IObjectCreateResponse[] | [];
}
