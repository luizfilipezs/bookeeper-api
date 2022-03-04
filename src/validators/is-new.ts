import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
class IsNewConstraint implements ValidatorConstraintInterface {

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entity, propertyName] = args.constraints;
    const repository = getRepository(entity);
    const record = await repository.findOne({ [propertyName]: value });

    return !record;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `O valor '$value' já foi utilizado em outro registro e não pode ser repetido.`;
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
export function IsNew(entity?: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity || object.constructor, propertyName],
      validator: IsNewConstraint,
    });
  };
}