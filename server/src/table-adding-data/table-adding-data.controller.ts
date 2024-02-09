import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateDelTableDto } from './dto/create-deltable.dto';
import { CreateTableAddingDatumDto } from './dto/create-table-adding-datum.dto';
import { UpdateTableAddingDatumDto } from './dto/update-table-adding-datum.dto';
import { TableAddingDataService } from './table-adding-data.service';

@Controller('table-adding-data')
export class TableAddingDataController {
  constructor(
    private readonly tableAddingDataService: TableAddingDataService,
  ) {}

  @Post()
  create(@Body() createTableAddingDatumDto: CreateTableAddingDatumDto) {
    return this.tableAddingDataService.create(createTableAddingDatumDto);
  }

  @Get()
  findAll() {
    return this.tableAddingDataService.findAll();
  }

  @Get('/strings')
  findAllString(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ) {
    return this.tableAddingDataService.findAllString(
      page,
      limit,
      dateFrom,
      dateTo,
    );
  }

  @Get('/historyForName')
  getHistoryForNameWorkId(
    @Query('nameListId') nameListId: number,
    @Query('nameWorkId') nameWorkId: number,
    @Query('scopeWorkId') scopeWorkId: number,
  ) {
    return this.tableAddingDataService.getHistoryForNameWorkId({
      nameListId,
      nameWorkId,
      scopeWorkId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableAddingDataService.findOne(+id);
  }

  @Get('/history/:id')
  getHistory(@Param('id') id: string) {
    return this.tableAddingDataService.getHistory(Number(id));
  }

  @Post('/createCandidateDel')
  createCandidateDel(@Body() dto: CreateDelTableDto) {
    return this.tableAddingDataService.createCandidateDel(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTableAddingDatumDto: UpdateTableAddingDatumDto,
  ) {
    return this.tableAddingDataService.update(+id, updateTableAddingDatumDto);
  }

  @Patch('/remove/:id')
  remove(@Param('id') id: string) {
    return this.tableAddingDataService.remove(+id);
  }

  @Patch('/recovery/:id')
  recover(@Param('id') id: string) {
    return this.tableAddingDataService.recovery(+id);
  }

  @Patch('/confirm/:id')
  confirmDelCandidate(
    @Param('id') id: string,
    @Query('idDelCandidate') idDelCandidate: number,
  ) {
    return this.tableAddingDataService.confirmDelCandidate(+id, idDelCandidate);
  }
}
