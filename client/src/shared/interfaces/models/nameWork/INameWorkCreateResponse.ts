import { ITypeWork } from "../typeWork";

export interface INameWorkCreateResponse {
    id: number;
    name: string;
    unit: string;
    updatedAt: Date;
    createdAt: Date;
    deletedAt: boolean | null;
    typeWorks: ITypeWork[] | null;
}
