import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Repository } from 'typeorm';

/**
 * Provides methods for creating, retrieving, updating, and deleting
 * records from a repository.
 */
export abstract class CrudService<T extends object, D extends object> {
  /**
   * Indicates whether a 404 error should be returned when a record is not
   * found. Defaults to `true`.
   */
  throwNotFoundException = true;

  constructor(
    protected readonly entity: new (...args: any[]) => T,
    protected readonly entityDto: new (...args: any[]) => D,
    protected readonly repository: Repository<T>
  ) { }

  /**
   * Finds a record by its ID.
   * 
   * @param {string} id Record ID.
   * 
   * @returns {Promise<T>}
   */
  findOne(id: string): Promise<T> {
    return this.repository.findOne(id);
  }

  /**
   * Finds all records.
   * 
   * @returns {Promise<T[]>}
   */
  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  /**
   * Creates a new record.
   * 
   * @param {object} data Data to be assigned to the new record. (It will be
   * converted to a DTO instance in order to be validated.)
   * 
   * @returns {Promise<T>}
   */
  create(data: object): Promise<T> {
    const instance = new this.entity();

    return this.save(instance, data);
  }

  /**
   * Updates a record.
   * 
   * @param {string} id Record ID. 
   * @param {object} data Data to be assigned to the record. (It will be
   * converted to a DTO instance in order to be validated.)
   * 
   * @returns {Promise<T>}
   */
  async update(id: string, data: object): Promise<T> {
    const instance = await this.findOne(id);

    return this.save(instance, data);
  }

  /**
   * Deletes a record.
   * 
   * @param {string} id Record ID.
   * 
   * @returns {Promise<T>}
   */
  async remove(id: string): Promise<T> {
    const instance = await this.findOne(id);

    return this.repository.remove(instance);
  }

  /**
   * Creates/updates a record based on the given data.
   * 
   * @param {T} instance Record to be saved. 
   * @param {object} data Object from which DTO should be instantiated.
   * 
   * @returns {Promise<T>}
   */
  protected async save(instance: T, data: object): Promise<T> {
    const dto = plainToClass(this.entityDto, data);
    
    await this.validateDto(dto);
    this.transferData(instance, dto);
    await this.validateInstance(instance);

    return this.repository.save(instance as any);
  }

  /**
   * Assigns data into an instance.
   * 
   * It is highly recommended to override this method and pass the value for each
   * property individually, as in the example below:
   * 
   * @example
   * ```ts
   * protected transferData(instance: MyEntity, dto: MyEntityDto): void {
   *   instance.someProperty = dto.someProperty;
   *   instance.anotherProperty = dto.anotherProperty;
   * }
   * ```
   * 
   * @param {T} instance Instance on which data should be assigned.
   * @param {D} dto Data transfer object from which data shoud be extracted.
   */
  protected transferData(instance: T, dto: D): void {
    Object.assign(instance, dto);
  }

  /**
   * Validates validation errors on DTOs and records.
   * 
   * @param errors 
   */
  protected handleValidationErrors(errors: ValidationError[]): void {
    const entityName = this.entity.constructor.name;
    const responseBody = HttpException.createBody({
      message: `It was not possible to save the ${entityName}. ${errors.length} validation error(s) found.`,
      errors,
    });

    throw new HttpException(responseBody, HttpStatus.BAD_REQUEST);
  }

  /**
   * Validates a DTO.
   * 
   * @param {D} dto DTO to be validated.
   */
  private async validateDto(dto: D): Promise<void> {
    const dtoErrors = await validate(dto);

    if (dtoErrors.length) {
      this.handleValidationErrors(dtoErrors);
    }
  }

  /**
   * Validates a record.
   * 
   * @param {D} dto Record to be validated.
   */
  private async validateInstance(instance: T): Promise<void> {
    const instanceErrors = await validate(instance);

    if (instanceErrors.length) {
      this.handleValidationErrors(instanceErrors);
    }
  }

}
