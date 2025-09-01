import joi from "joi";

export const createOrderValidation = joi
  .object({
    clientDocument: joi.string().required(),
    items: joi.array().required(),
  })
  .options({ allowUnknown: true });
