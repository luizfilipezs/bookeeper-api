import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection]),
  ],
})
export class CollectionsModule {}
