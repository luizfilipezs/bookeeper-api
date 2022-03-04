import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
class IsForeignKeyConstraint implements ValidatorConstraintInterface {

  async validate(id: any, args: ValidationArguments): Promise<boolean> {
    const entity = args.constraints[0];
    const repository = getRepository(entity);
    const record = await repository.findOne(id);

    return !!record;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'A chave estrangeira ($value) não existe.'
  }

}

/**
 * Validates the property value as an existing foreign key.
 * 
 * @param {any} entity Entity to which the foreign key belongs.
 * @param {ValidationOptions} validationOptions Validation options.
 * 
 * @returns Property decorator.
 */
export function IsForeignKey(entity: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: IsForeignKeyConstraint,
    });
  };
}