const Joi = require('joi');

async function taskCheck(req, res, mext) {
    const taskschema = Joi.object({
        description: Joi.string().required(),
        completed: Joi.boolean().optional()
    })

    try {
        await taskschema.validateAsync(req.body)
        next()    
    } catch (error) {
        logger.debug.info(error)
        next(error)
    }
}


module.exports = {
    taskCheck
}