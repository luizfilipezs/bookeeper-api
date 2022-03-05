import { Controller } from '@nestjs/common';
import { CrudController } from 'src/crud.controller';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController extends CrudController<Category> {

  constructor(service: CategoriesService) {
    super(service);
  }

}