import { CreateListDto } from './create-list.dto';

export class ListNameWorkEditDto extends CreateListDto {
  readonly idNumber: number;
}
