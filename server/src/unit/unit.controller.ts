import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/iam/authorization/guards/roles/roles.guard';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { Roles } from 'src/iam/decorators/roles-auth.decorator';
import { RoleName } from 'src/iam/enums/RoleName';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { CreateUniteDto } from './dto/unit.dto';
import { Unit } from './entities/unit.model';
import { UnitService } from './unit.service';

@ApiTags('Единица измерения')
@ApiBearerAuth()
@Controller('unit')
export class UnitController {
    constructor(private unitService: UnitService) {}

    @ApiOperation({ summary: 'Получение списка' })
    @ApiResponse({ status: HttpStatus.OK, type: Unit })
    @ApiResponse({ type: HttpException })
    @Get('/')
    getAll(@ActiveUser() user: ActiveUserData) {
        return this.unitService.getAllUnit(user.organizationId);
    }

    @Roles(RoleName.ADMIN)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: 'Создание' })
    @ApiResponse({ status: HttpStatus.OK, type: Unit })
    @ApiResponse({ type: HttpException })
    @Post('/')
    create(@Body() dto: CreateUniteDto, @ActiveUser() user: ActiveUserData) {
        return this.unitService.createUnit(dto, user.organizationId);
    }

    @ApiOperation({ summary: 'Получить наименование по id' })
    @ApiResponse({ status: HttpStatus.OK, type: Unit })
    @ApiResponse({ type: HttpException })
    @Get('/getName/:id')
    getName(@Param('id') id: number, @ActiveUser() user: ActiveUserData) {
        return this.unitService.getUnitName(id, user.organizationId);
    }
}
