import { IsNotEmpty, IsString } from 'class-validator';

export class CloudDocumentDto {
  /**
   * URL of the uploaded object.
   */
  @IsString()
  @IsNotEmpty()
  Location: string;

  /**
   * ETag of the uploaded object.
   */
  @IsString()
  @IsNotEmpty()
  ETag: string;

  /**
   * Bucket to which the object was uploaded.
   */
  @IsString()
  @IsNotEmpty()
  Bucket: string;

  /**
   * Key to which the object was uploaded.
   */
  @IsString()
  @IsNotEmpty()
  Key: string;
}