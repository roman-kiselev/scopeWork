export class ModelArrStandart<T> {
    constructor(private arr: T[]) {}

    public getField<C, R>(
        field: keyof T,
        fieldR: keyof T,
        content: C
    ): R | number {
        if (this.arr.length > 0) {
            const finded = this.arr.find(
                (item: T) => (item as any)[field] === content
            );

            return (finded as any)[fieldR];
        }

        return 0;
    }
}
