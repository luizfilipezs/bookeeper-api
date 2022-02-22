import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { ReadingsModule } from './readings/readings.module';
import { CollectionsModule } from './collections/collections.module';
import { PublishersModule } from './publishers/publishers.module';
import { AuthorsModule } from './authors/authors.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';
import * as ormConfig from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    BooksModule,
    ReadingsModule,
    CollectionsModule,
    PublishersModule,
    AuthorsModule,
    ReviewsModule,
    TagsModule,
  ],
})
export class AppModule {}
