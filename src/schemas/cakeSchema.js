import Joi from "joi"

export const cakeSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    image: Joi.string().uri().required(),
    description: Joi.string().required()
})

