const Joi = require('joi');



async function checkuser(req, res, next) {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.any().required()
    })
    try {
        await userSchema.validateAsync(req.body)
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
}


async function checklogin(req, res, next) {
    const loginSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.any().required()
    })
    try {
        await loginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    checklogin,
    checkuser
}