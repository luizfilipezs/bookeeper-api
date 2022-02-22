import { IsDefined, IsInt } from 'class-validator';
import { Book } from 'src/books/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReadingStatus } from './reading-status';

@Entity({
  orderBy: {
    startDate: 'DESC',
  },
})
export class Reading {
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
  @IsInt()
  volumeNumber: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  @IsDefined()
  startDate: Date;

  @Column({
    type: 'date',
  })
  endDate: Date;

  /**
   * String indicating the current status of the reading.
   * 
   * @return {string} Reading status.
   */
  get status(): ReadingStatus {
    const today = new Date();

    if (this.startDate > today) {
      return 'scheduled';
    }

    if (this.endDate) {
      return 'complete';
    }

    return 'in progress';
  }
}
