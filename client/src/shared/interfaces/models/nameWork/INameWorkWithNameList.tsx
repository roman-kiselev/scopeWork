import { INameListForNameWork } from "../nameList";

export interface INameWorkWithNameList {
    id: number;
    name: string;
    unit: number;
    updatedAt: Date;
    createdAt: Date;
    deletedAt: boolean | null;
    typeWorks: number;
    NameList: INameListForNameWork;
}
