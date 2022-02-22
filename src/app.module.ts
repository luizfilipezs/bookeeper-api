import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './modules/books/books.module';
import { ReadingsModule } from './modules/readings/readings.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TagsModule } from './modules/tags/tags.module';
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
