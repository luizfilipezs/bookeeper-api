import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './modules/books/books.module';
import { ReadingsModule } from './modules/readings/readings.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { TagsModule } from './modules/tags/tags.module';
import { CloudDocumentsModule } from './modules/cloud-documents/cloud-documents.module';
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
    CloudDocumentsModule,
  ],
})
export class AppModule {}
