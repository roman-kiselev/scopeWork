import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
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
import { CreateNameWorkArrDto } from './dto/create-name-work-arr.dto';
import { CreateNameWorkRowDto } from './dto/create-name-work-row.dto';
import { CreateNameWorkDto } from './dto/create-name-work.dto';
import { NameWork } from './entities/name-work.model';
import { NameWorkService } from './name-work.service';

@ApiTags('Наименования работ')
@ApiBearerAuth()
@Roles(RoleName.ADMIN)
@UseGuards(RolesGuard)
@Controller('name-work')
export class NameWorkController {
    constructor(private nameWorkService: NameWorkService) {}

    @ApiOperation({ summary: 'Получить все' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/')
    getAll(@ActiveUser() user: ActiveUserData) {
        return this.nameWorkService.findAllNamesWithTypes(user.organizationId);
    }

    @ApiOperation({ summary: 'Получить все целиком' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/getAll')
    getAllC(@ActiveUser() user: ActiveUserData) {
        return this.nameWorkService.getAllData(user.organizationId);
    }

    @ApiOperation({ summary: 'Поиск по имени' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/findByName')
    findByName(
        @Query('text') text: string,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.nameWorkService.findNameWorksByName(
            text,
            user.organizationId,
        );
    }

    @ApiOperation({ summary: 'Получить по типу' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameWork] })
    @ApiResponse({ type: HttpException })
    @Get('/byTypeWork')
    getAllByTypeWork(
        @Query('typeWorkId') typeWorkId: string,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.nameWorkService.getAllByTypeWorkId(
            typeWorkId,
            user.organizationId,
        );
    }

    @ApiOperation({ summary: 'Получить по id' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Get('/:id')
    getById(@Param('id') id: number, @ActiveUser() user: ActiveUserData) {
        return this.nameWorkService.getOneById(id, user.organizationId);
    }

    @ApiOperation({ summary: 'Получить по id (коротко))' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Get('/short/:id')
    getOneByIdShort(
        @Param('id') id: number,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.nameWorkService.getOneByIdShort(id, user.organizationId);
    }

    @ApiOperation({ summary: 'Создание нового наименования' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Post('/')
    create(@Body() dto: CreateNameWorkDto, @ActiveUser() user: ActiveUserData) {
        return this.nameWorkService.createNameWorkDefault(
            dto,
            user.organizationId,
        );
    }

    @ApiOperation({ summary: 'Создание массива' })
    @ApiResponse({ status: HttpStatus.OK, type: NameWork })
    @ApiResponse({ type: HttpException })
    @Post('/arr')
    createArr(
        @Body() dto: CreateNameWorkArrDto[],
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.nameWorkService.createArrNameWork(dto, user.organizationId);
    }

    @ApiOperation({ summary: 'Создание массива из excel' })
    @ApiResponse({ status: HttpStatus.OK, type: [CreateNameWorkRowDto] })
    @ApiResponse({ type: HttpException })
    @Post('/createExcel')
    createExcel(
        @Body() dto: CreateNameWorkRowDto[],
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.nameWorkService.createNameWork(dto, user.organizationId);
    }
}
