import { Controller } from '@nestjs/common';
import { CrudController } from 'src/crud.controller';
import { Publisher } from './publisher.entity';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController extends CrudController<Publisher> {

  constructor(service: PublishersService) {
    super(service);
  }

}