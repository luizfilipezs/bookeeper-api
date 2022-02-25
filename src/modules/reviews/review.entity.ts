import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Book } from '../books/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  @IsDefined()
  bookId: string;

  @ManyToOne(() => Book, (book) => book.readings)
  book: Book;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @Column()
  @IsString()
  content: string;
}
