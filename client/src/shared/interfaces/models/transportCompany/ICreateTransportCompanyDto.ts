import { ITransportCompany } from "./ITransportCompany";

export type ICreateTransportCompanyDto = Omit<ITransportCompany, "id">;
