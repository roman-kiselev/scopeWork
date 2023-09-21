import { INameWorkWithNameList } from "../nameWork/INameWorkWithNameList";

export interface INameListWork {
    id: number;
    name: string;
    description: string;
    deletedAt: null | string;
    createdAt: string;
    updatedAt: string;
    typeWorkId: number;
    nameWorks: INameWorkWithNameList[];
}
