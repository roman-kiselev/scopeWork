import { NameWork } from '../entities/name-work.model';

export class GetOneNameWorkBy {
    criteria: Partial<NameWork>;
    relations?: (keyof NameWork)[];
}
