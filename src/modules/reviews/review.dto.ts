import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsForeignKey } from 'src/validators/is-foreign-key';
import { Book } from '../books/book.entity';

export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  @IsForeignKey(Book)
  bookId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  content: string;
}