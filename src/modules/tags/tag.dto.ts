import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsNew } from 'src/validators/is-new';
import { Tag } from './tag.entity';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsNew(Tag)
  name: string;
}