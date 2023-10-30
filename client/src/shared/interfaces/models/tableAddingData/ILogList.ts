interface IRow {
    id: number;
    userId: number;
    scopeWorkId: number;
    nameWorkId: number;
    nameListId: number;
    createdAt: string;
    text: string;
}

interface IPagination {
    count: number;
    page: string;
    limit: string;
}

export interface ILogList {
    rows: IRow[];
    pagination: IPagination;
}
