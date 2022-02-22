import { IsNotEmpty, IsString } from 'class-validator';
import { Book } from 'src/books/book.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];
}
