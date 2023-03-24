import Joi from 'joi';

export const orderSchema = Joi.object({
  clientId: Joi.number().required(),
  cakeId: Joi.number().required(),
  quantity: Joi.number().required().min(0).max(5),
  totalPrice: Joi.number().required()
});