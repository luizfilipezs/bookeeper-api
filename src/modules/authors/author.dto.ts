import { IsNotEmpty, IsString } from 'class-validator';
import { IsNew } from 'src/validators/is-new';
import { Author } from './author.entity';

export class AuthorDto {
  @IsString()
  @IsNotEmpty()
  @IsNew(Author)
  name: string;
}