import { Controller } from '@nestjs/common';
import { CrudController } from 'src/crud.controller';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController extends CrudController<Author> {

  constructor(service: AuthorsService) {
    super(service);
  }

}