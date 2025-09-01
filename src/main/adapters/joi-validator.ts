import type {
  Validator,
  ValidatorResult,
} from "@/application/adapter/validator";
import type { ObjectSchema, StringSchema } from "joi";

export class JoiValidator<T> implements Validator<T> {
  constructor(private readonly joiSchema: ObjectSchema<T> | StringSchema<T>) {}

  validate(payload: T): ValidatorResult {
    const errorMessage = this.joiSchema
      .validate(payload, { allowUnknown: true, abortEarly: false })
      .error?.details.map((g) => g.message)
      .join(", ");

    if (errorMessage) {
      return { invalid: true, message: errorMessage };
    }

    return { invalid: false };
  }
}
