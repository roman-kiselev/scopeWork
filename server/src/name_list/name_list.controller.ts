import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { CreateNameListDto } from './dto/create-name-list.dto';
import { NameList } from './entities/name-list.model';
import { NameListService } from './name_list.service';

@ApiTags('Name List')
@ApiBearerAuth()
@Controller('name-list')
export class NameListController {
    constructor(private nameListService: NameListService) {}

    @ApiOperation({ summary: 'Получение всех списков' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameList] })
    @ApiResponse({ type: HttpException })
    @Get('/')
    getAll() {
        return this.nameListService.getAll();
    }

    @ApiOperation({ summary: 'Получение данных по одному наименованию' })
    @Get('/getDateForOne')
    getDateForOne(
        @Query('nameWorkId') nameWorkId: number,
        @Query('listId') listId: number,
    ) {
        return this.nameListService.getDateByNameWorkIdAndListId(
            nameWorkId,
            listId,
        );
    }

    @ApiOperation({
        summary: 'Получение данных по прогрессу одному наименованию',
    })
    @Get('/getDataProgressByList')
    getDataProgressByList(
        @Query('listId') listId: number,
        @Query('scopeWorkId') scopeWorkId: number,
    ) {
        return this.nameListService.getDataProgressByList(listId, scopeWorkId);
    }

    @ApiOperation({ summary: 'Наименование для одного списка' })
    @Get('/getNames/:id')
    getAllNameWorkByListId(
        @Param('id') id: number,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.nameListService.getAllNameWorkByListId(
            id,
            user.organizationId,
        );
    }

    @ApiOperation({ summary: 'Создание' })
    @ApiResponse({ status: HttpStatus.OK, type: [NameList] })
    @ApiResponse({ type: HttpException })
    @Post('/')
    create(@Body() dto: CreateNameListDto) {
        return this.nameListService.create(dto);
    }
}
