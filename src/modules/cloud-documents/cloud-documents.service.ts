import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { CrudService } from 'src/crud.service';
import { Repository } from 'typeorm';
import { CloudDocumentDto } from './cloud-document.dto';
import { CloudDocument } from './cloud-document.entity';

@Injectable()
export class CloudDocumentsService extends CrudService<CloudDocument, CloudDocumentDto> {
  /**
   * S3 bucket where files are stored.
   */
  private readonly S3_BUCKET = 'my-aws-bucket';

  /**
   * Initializes a new service.
   * 
   * @param {Repository<CloudDocument>} repository `CloudDocument` repository.
   */
  constructor(@InjectRepository(CloudDocument) repository: Repository<CloudDocument>) {
    super(CloudDocument, CloudDocumentDto, repository);
  }

  /**
   * Uploads a file to S3 and creates a new `CloudDocument`.
   * 
   * @param {Express.Multer.File} file File to be uploaded.
   * 
   * @returns {Promise<CloudDocument>}
   */
  override async create(file: Express.Multer.File): Promise<CloudDocument> {
    const createdFileInfo = await this.uploadFile(file);
    const cloudDocument = new CloudDocument();

    cloudDocument.filename = file.originalname;

    return super.save(cloudDocument, createdFileInfo);
  }

  /**
   * Assigns data into an instance.
   * 
   * @param {CloudDocument} instance Record to get data updated.
   * @param {CloudDocumentDto} dto Data transfer object.
   */
  protected override transferData(instance: CloudDocument, dto: CloudDocumentDto): void {
    instance.location = dto.Location;
    instance.eTag = dto.ETag;
    instance.bucket = dto.Bucket;
    instance.key = dto.Key;
  }

  /**
   * Handles S3 file upload.
   * 
   * @param {Express.Multer.File} file File to be uploaded.
   * 
   * @returns {Promise<S3.ManagedUpload.SendData>}
   */
  private async uploadFile(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.S3_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
    };

    return this.uploadToS3(params);
  }

  /**
   * Requests S3 upload.
   * 
   * @param {S3.PutObjectRequest} params Request parameters.
   * 
   * @returns {Promise<S3.ManagedUpload.SendData>} S3 response.
   */
  private async uploadToS3(params: S3.PutObjectRequest): Promise<S3.ManagedUpload.SendData> {
    const s3 = this.getS3();

    return new Promise((resolve, reject) => {
      s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData): void => {
        if (err) {
          Logger.error(err, 'Uploading file to Amazon S3');
          reject(err.message);
        }

        resolve(data);
      });
    });
  }

  /**
   * Returns a new instance of `S3` with proper configuration.
   * 
   * @returns {S3}
   */
  private getS3(): S3 {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

}