import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { CollectionDto } from './collection.dto';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService extends CrudService<Collection, CollectionDto> {

  constructor(@InjectRepository(Collection) collectionsRepository: Repository<Collection>) {
    super(Collection, CollectionDto, collectionsRepository);
  }

  protected override transferData(instance: Collection, dto: CollectionDto): void {
    instance.name = dto.name;
    instance.description = dto.description;
  }

}