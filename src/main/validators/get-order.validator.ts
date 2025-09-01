import joi from "joi";

export const getOrderValidation = joi
  .object({
    orderId: joi.string().required(),
  })
  .options({ allowUnknown: true });
