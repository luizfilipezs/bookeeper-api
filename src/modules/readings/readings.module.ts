import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './reading.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading]),
  ],
})
export class ReadingsModule {}
