import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { AuthorDto } from './author.dto';
import { Author } from './author.entity';

@Injectable()
export class AuthorsService extends CrudService<Author, AuthorDto> {

  constructor(@InjectRepository(Author) authorsRepository: Repository<Author>) {
    super(Author, AuthorDto, authorsRepository);
  }

  protected override transferData(instance: Author, dto: AuthorDto): void {
    instance.name = dto.name;
  }

}