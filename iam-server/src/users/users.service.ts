import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/iam/authentication/dto/sign-up.dto';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { RoleName } from 'src/roles/enums/RoleName';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private organizationService: OrganizationsService,
        private rolesService: RolesService,
    ) {}

    async findOneBy(criteria: Partial<User>) {
        const user = await this.userRepository.findOne({ where: criteria });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async findOneWithRelation(criteria: Partial<User>, relations: string[]) {
        const user = await this.userRepository.findOne({
            where: criteria,
            relations,
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async checkUniqueEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
            return user;
        }
        return null;
    }

    async createUser(dto: SignUpDto) {
        console.log(dto);
        const isUser = await this.userRepository.findOneBy({
            email: dto.email,
        });
        if (isUser) {
            throw new ConflictException('User already exists');
        }
        const role = await this.rolesService.findOneBy({
            name: dto.role ? dto.role : RoleName.USER,
        });
        const organization = await this.organizationService.findUnique(
            +dto.organizationId,
        );

        const user = new User();
        user.email = dto.email;
        user.password = dto.password;
        user.organization = organization;
        user.roles = [role];

        return this.userRepository.save(user);
    }
}
