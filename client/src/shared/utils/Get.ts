import { IUnit } from "../interfaces";

export const getUnit = (data: IUnit[] | undefined, id: number) => {
    if (data) {
        return data.find((item) => item.id === id)?.name;
    }
};

export const getDate = (createDate: Date) => {
    const date = new Date(createDate);
    const dateDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const dateMonthFrom =
        date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${dateDay}.${dateMonthFrom}.${year}`;
};

export const getDateWithTime = (createDate: Date) => {
    const date = new Date(createDate);
    const dateDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const dateMonthFrom =
        date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`;
    const year = date.getFullYear();

    return {
        dateFrom: `${dateDay}.${dateMonthFrom}.${year} 00:00:00`,
        dateTo: `${dateDay}.${dateMonthFrom}.${year} 23:59:59`,
    };
};
