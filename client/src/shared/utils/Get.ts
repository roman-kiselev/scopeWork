import { IUnit } from "../interfaces";

export const getUnit = (data: IUnit[] | undefined, id: number) => {
    if (data) {
        return data.find((item) => item.id === id)?.name;
    }
};
