import { IsBoolean, IsDefined, IsEnum, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { Author } from '../authors/author.entity';
import { Collection } from '../collections/collection.entity';
import { Publisher } from '../publishers/publisher.entity';
import { Reading } from '../readings/reading.entity';
import { Review } from '../reviews/review.entity';
import { Tag } from '../tags/tag.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConservationState } from './conservation-state';

/**
 * Entity that holds information about the contents of the book and its conditions.
 */
@Entity()
export class Book {
  /**
   * Identifier token.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Publisher ID.
   */
  @Column({
    nullable: false,
  })
  @IsDefined()
  publisherId: string;

  /**
   * Publishing company.
   */
  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  publisher: Publisher;

  /**
   * Title.
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Volume quantity. Defaults to `1`.
   */
  @Column({
    default: 1,
    nullable: false,
  })
  @IsInt()
  volumeQuantity: number;

  /**
   * Number of pages.
   */
  @Column({
    nullable: false,
  })
  @IsInt()
  length: number;

  /**
   * Enum value that indicates the conservation state of the book.
   */
  @Column({
    type: 'enum',
    enum: ConservationState,
    default: ConservationState.New,
  })
  @IsEnum(ConservationState)
  conservationState: ConservationState;

  /**
   * Description of book content.
   */
  @Column({
    type: 'text',
  })
  @IsString()
  description: string;

  /**
   * Year the book is published.
   */
  @Column()
  @IsInt()
  year: number;

  /**
   * Language abbreviation. Ex.: `"pt-BR"`.
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  language: string;

  /**
   * Indicates whether the book has a box. Defaults to `false`.
   */
  @Column({
    default: false,
  })
  @IsBoolean()
  hasBox: boolean;

  /**
   * Date of acquisition on library.
   */
  @Column({
    type: 'date',
  })
  dateOfAcquisition: Date;

  /**
   * ISBN-10 code.
   */
  @Column({
    length: 10,
  })
  @IsString()
  @Length(10, 10)
  isbn10: string;

  /**
   * ISBN-13 code.
   */
  @Column({
    length: 14,
  })
  @IsString()
  @Length(14, 14)
  isbn13: string;

  /**
   * Volume dimensions. Ex.: `"20.8 x 14 x 1.8 cm"`.
   */
  @Column()
  @IsString()
  dimensions: string;

  /**
   * List of authors.
   */
  @ManyToMany(() => Author)
  @JoinTable()
  authors: Author[];

  /**
   * List of translators.
   */
  @ManyToMany(() => Author)
  @JoinTable()
  translators: Author[];

  /**
   * Tags linked to the book.
   */
  @ManyToMany(() => Tag)
  tags: Tag[];

  /**
   * Collections to which the book belongs.
   */
  @ManyToMany(() => Collection)
  @JoinTable()
  collections: Collection[];

  /**
   * Book readings.
   */
  @OneToMany(() => Reading, (reading) => reading.book)
  readings: Reading[];

  /**
   * Book reviews.
   */
  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
