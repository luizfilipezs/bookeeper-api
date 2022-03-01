import { Module } from '@nestjs/common';
import { CloudDocumentsControler } from './cloud-documents.controller';
import { CloudDocumentsService } from './cloud-documents.service';

@Module({
  controllers: [
    CloudDocumentsControler,
  ],
  providers: [
    CloudDocumentsService,
  ],
})
export class CloudDocumentsModule {}
