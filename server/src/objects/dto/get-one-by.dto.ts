import { Objects } from '../entities/objects.model';

export class GetOneDto {
    criteria: Partial<Objects>;
    relations?: (keyof Objects)[];
}
