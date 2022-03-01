import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Amazon S3 object data.
 */
@Entity()
export class CloudDocument {
  /**
   * ID on the database.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Original filename.
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  filename: string;

  /**
   * URL of the uploaded object.
   */
  @Column()
  @IsString()
  location: string;

  /**
   * ETag of the uploaded object.
   */
  @Column()
  @IsString()
  eTag: string;

  /**
   * Bucket to which the object was uploaded.
   */
  @Column()
  @IsString()
  bucket: string;

  /**
   * Key to which the object was uploaded.
   */
  @Column()
  @IsString()
  key: string;
}