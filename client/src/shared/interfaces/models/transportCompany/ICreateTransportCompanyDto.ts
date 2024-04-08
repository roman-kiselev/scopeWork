import { ITransportCompany } from "./ITransportCompany";

export interface ICreateTransportCompanyDto
    extends Omit<ITransportCompany, "id"> {}
