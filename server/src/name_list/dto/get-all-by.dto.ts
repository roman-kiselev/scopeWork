import { NameList } from '../entities/name-list.model';

export class GetAllByDto {
    criteria: Partial<NameList>;
    relations?: (keyof NameList)[];
}
