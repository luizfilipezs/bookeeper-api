import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './reading.entity';
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading]),
  ],
  controllers: [
    ReadingsController,
  ],
  providers: [
    ReadingsService,
  ],
})
export class ReadingsModule {}
