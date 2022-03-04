import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { PublisherDto } from './publisher.dto';
import { Publisher } from './publisher.entity';

@Injectable()
export class PublishersService extends CrudService<Publisher, PublisherDto> {

  constructor(@InjectRepository(Publisher) publishersRepository: Repository<Publisher>) {
    super(Publisher, PublisherDto, publishersRepository);
  }

  protected override transferData(instance: Publisher, dto: PublisherDto): void {
    instance.name = dto.name;
  }

}