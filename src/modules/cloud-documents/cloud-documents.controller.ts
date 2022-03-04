import { Controller, MethodNotAllowedException, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CrudController } from 'src/crud.controller';
import { CloudDocument } from './cloud-document.entity';
import { CloudDocumentsService } from './cloud-documents.service';

@Controller('documents')
export class CloudDocumentsControler extends CrudController<CloudDocument> {
  
  constructor(service: CloudDocumentsService) {
    super(service);
  }

  @Post()
  override create(dto: object): Promise<CloudDocument> {
    throw new MethodNotAllowedException();
  }

  @Put(':id')
  override update(id: string, dto: object): Promise<CloudDocument> {
    throw new MethodNotAllowedException();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<CloudDocument> {
    return this.service.create(file);
  }

}