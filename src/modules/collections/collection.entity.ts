import { IsNotEmpty, IsString } from 'class-validator';
import { Book } from '../books/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'text',
  })
  @IsString()
  description: string;

  @ManyToMany(() => Book)
  books: Book[];
}