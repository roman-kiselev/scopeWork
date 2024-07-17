import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GetAllUsersWithDto } from './dtoEvents/get-all-users-with.dto';
import { GetUserDto } from './dtoEvents/get-user-by.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @EventPattern('get-all-users')
    async getAllUsers(organizationId: number) {
        return this.usersService.getAllUsers(organizationId);
    }

    @EventPattern('get-all-users-with')
    async getAllUsersWith(dto: GetAllUsersWithDto) {
        console.log(dto.organizationId, dto.relations);
        console.log('IAM');
        return this.usersService.getAllUsersWith(
            dto.organizationId,
            dto.relations,
        );
    }

    @EventPattern('get-user-by')
    async getUserBy(dto: GetUserDto) {
        return this.usersService.findOneWithRelation(
            dto.criteria,
            dto.relations,
        );
    }
}
