import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CrudService } from './crud.service';

export abstract class CrudController<T extends object, D extends object = object> {

  constructor(protected readonly service: CrudService<T, D>) { }

  @Post()
  create(@Body() dto: D): Promise<T> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<T> {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: D): Promise<T> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<T> {
    return this.service.remove(id);
  }

}