import { IsNotEmpty, IsString } from 'class-validator';
import { Book } from 'src/books/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ManyToMany(() => Book)
  books: Book[];
}