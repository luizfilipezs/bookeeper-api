import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { TagDto } from './tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService extends CrudService<Tag, TagDto> {

  constructor(@InjectRepository(Tag) tagsRepository: Repository<Tag>) {
    super(Tag, TagDto, tagsRepository);
  }

  protected override transferData(instance: Tag, dto: TagDto): void {
    instance.name = dto.name;
  }

}