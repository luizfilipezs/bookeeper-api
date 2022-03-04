import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { IsForeignKey } from 'src/validators/is-foreign-key';
import { Book } from '../books/book.entity';

export class ReadingDto {
  @IsString()
  @IsNotEmpty()
  @IsForeignKey(Book)
  bookId: string;

  @IsInt()
  volumeNumber: number;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ValidateIf((dto: ReadingDto) => dto.endDate !== undefined)
  @IsString()
  @IsNotEmpty()
  endDate?: string;
}