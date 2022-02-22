import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';
import { Book } from '../books/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  @IsDecimal()
  bookId: string;

  @ManyToOne(() => Book, (book) => book.readings)
  book: Book;

  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  content: string;
}
