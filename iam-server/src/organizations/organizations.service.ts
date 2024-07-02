import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    async findUnique(id: number) {
        const organization = await this.organizationRepository.findOneBy({
            id,
        });
        if (!organization) {
            throw new NotFoundException('Организация не найдена');
        }
        return organization;
    }

    async getOrganigationBy(criteria: Partial<Organization>) {
        const organization = await this.organizationRepository.findOne({
            where: criteria,
        });
        if (!organization) {
            throw new NotFoundException(`Organization not found`);
        }

        return organization;
    }

    async create(dto: CreateOrganizationDto) {
        const organization = new Organization();
        organization.name = dto.name;
        organization.address = dto.address;
        return this.organizationRepository.save(organization);
    }

    delete(id: number) {
        return this.organizationRepository.delete(id);
    }
}
