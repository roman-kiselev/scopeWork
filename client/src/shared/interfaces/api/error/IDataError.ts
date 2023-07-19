interface IMessage {
    message: string;
}

export interface IDataError {
    status: number | null;
    data: IMessage;
}
