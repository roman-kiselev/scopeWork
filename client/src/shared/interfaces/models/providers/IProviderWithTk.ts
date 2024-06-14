import { ITransportCompanyToProvider } from "../transportCompany";
import { IProvider } from "./IProvider";

export interface IProviderWithTk extends IProvider {
    transportCompany: [] | IProvider;
    TransportCompanyToProvider: ITransportCompanyToProvider[] | [];
}
