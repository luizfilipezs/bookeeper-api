import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Book } from '../books/book.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  @MaxLength(100)
  name: string;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];
}