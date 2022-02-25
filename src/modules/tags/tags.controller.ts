import { Controller } from '@nestjs/common';
import { CrudController } from 'src/crud.controller';
import { TagDto } from './tag.dto';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController extends CrudController<Tag, TagDto> {

  constructor(service: TagsService) {
    super(service);
  }

}