import { ICreateProviderDto } from "./ICreateProviderDto";

export interface ICreateProviderWithTkDto extends ICreateProviderDto {
    transportCompanyId: number[] | [];
    transportCompanyDefault: number | null;
}
