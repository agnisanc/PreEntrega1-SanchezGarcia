import Joi from "joi";

export const cartDto = Joi.objetc({
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().required(),
            quantity: Joi.number().required(),
        })
    )
})