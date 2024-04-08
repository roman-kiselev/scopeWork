import { CreateProviderDto } from './create-provider.dto';

export abstract class CreateProviderWithTk extends CreateProviderDto {
  readonly transportCompanyId: number[] | undefined;
  readonly transportCompanyDefault: number | undefined;
}
