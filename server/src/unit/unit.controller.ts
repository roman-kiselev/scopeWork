import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUniteDto } from './dto/unit.dto'
import { Unit } from './unit.model'
import { UnitService } from './unit.service'

@ApiTags('Единица измерения')
@Controller('unit')
export class UnitController {
    constructor(private unitService: UnitService) {
    }

    @ApiOperation({ summary: 'Получение списка' })
    @ApiResponse({ status: HttpStatus.OK, type: Unit })
    @ApiResponse({ type: HttpException })
    @Get('/')
    getAll() {
        return this.unitService.getAllUnit()
    }

    @ApiOperation({ summary: 'Создание' })
    @ApiResponse({ status: HttpStatus.OK, type: Unit })
    @ApiResponse({ type: HttpException })
    @Post('/')
    create(@Body() dto: CreateUniteDto) {
        return this.unitService.createUnit(dto)
    }
}
