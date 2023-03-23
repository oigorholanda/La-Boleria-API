import Joi from "joi"

export const cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }).trim().required(),
    description: Joi.string().required()
})

