import Joi from "joi";

export const userDto = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})