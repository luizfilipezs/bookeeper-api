import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService extends CrudService<Category, CategoryDto> {

  constructor(@InjectRepository(Category) repository: Repository<Category>) {
    super(Category, CategoryDto, repository);
  }

  protected override transferData(instance: Category, dto: CategoryDto): void {
    instance.name = dto.name;
  }

}