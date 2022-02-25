import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { ReviewDto } from './review.dto';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService extends CrudService<Review, ReviewDto> {

  constructor(@InjectRepository(Review) reviewsRepository: Repository<Review>) {
    super(Review, ReviewDto, reviewsRepository);
  }

  protected override transferData(instance: Review, dto: ReviewDto): void {
    instance.bookId = dto.bookId;
    instance.title = dto.title;
    instance.content = dto.content;
  }

}