import { IsNotEmpty, IsString } from 'class-validator';
import { Book } from 'src/books/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ManyToMany(() => Book)
  books: Book[];
}
