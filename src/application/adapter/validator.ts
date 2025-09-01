export interface ValidatorResult {
  invalid: boolean;
  message?: string;
}

export interface Validator<T> {
  validate: (input: T) => ValidatorResult;
}
