import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableAddingDataService } from './table-adding-data.service';
import { CreateTableAddingDatumDto } from './dto/create-table-adding-datum.dto';
import { UpdateTableAddingDatumDto } from './dto/update-table-adding-datum.dto';

@Controller('table-adding-data')
export class TableAddingDataController {
  constructor(private readonly tableAddingDataService: TableAddingDataService) {}

  @Post()
  create(@Body() createTableAddingDatumDto: CreateTableAddingDatumDto) {
    return this.tableAddingDataService.create(createTableAddingDatumDto);
  }

  @Get()
  findAll() {
    return this.tableAddingDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableAddingDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableAddingDatumDto: UpdateTableAddingDatumDto) {
    return this.tableAddingDataService.update(+id, updateTableAddingDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableAddingDataService.remove(+id);
  }
}
