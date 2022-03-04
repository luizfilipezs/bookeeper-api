import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { ReadingDto } from './reading.dto';
import { Reading } from './reading.entity';

@Injectable()
export class ReadingsService extends CrudService<Reading, ReadingDto> {

  constructor(@InjectRepository(Reading) readingsRepository: Repository<Reading>) {
    super(Reading, ReadingDto, readingsRepository);
  }

  protected override transferData(instance: Reading, dto: ReadingDto): void {
    instance.bookId = dto.bookId;
    instance.volumeNumber = dto.volumeNumber;
    instance.startDate = new Date(dto.startDate);

    if (dto.endDate) {
      instance.endDate = new Date(dto.endDate);
    }
  }

}