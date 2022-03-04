import { Controller } from '@nestjs/common';
import { CrudController } from 'src/crud.controller';
import { Reading } from './reading.entity';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController extends CrudController<Reading> {

  constructor(service: ReadingsService) {
    super(service);
  }

}