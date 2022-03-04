import { Controller } from '@nestjs/common';
import { CrudController } from 'src/crud.controller';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController extends CrudController<Review> {

  constructor(service: ReviewsService) {
    super(service);
  }

}