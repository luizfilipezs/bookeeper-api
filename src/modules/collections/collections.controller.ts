import { Controller } from '@nestjs/common';
import { CrudController } from 'src/crud.controller';
import { Collection } from './collection.entity';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController extends CrudController<Collection> {

  constructor(service: CollectionsService) {
    super(service);
  }

}