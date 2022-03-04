import { IsNotEmpty, IsString } from 'class-validator';
import { IsNew } from 'src/validators/is-new';
import { Publisher } from './publisher.entity';

export class PublisherDto {
  @IsString()
  @IsNotEmpty()
  @IsNew(Publisher)
  name: string;
}