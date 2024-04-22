// export interface IEditRowByName<T extends Record<string, string | number>> {
//     // Получаем только ключи от T
//     nameField: keyof T;
//     key: string;
//     // Получаем тип от выбранного key
//     value: T[keyof T];
// }

export interface IEditRowByName<T> {
    // Получаем только ключи от T
    nameField: keyof T;
    key: string;
    // Получаем тип от выбранного key
    value: T[keyof T] | string | number;
}
