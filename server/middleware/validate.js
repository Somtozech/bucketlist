const Joi = require('@hapi/joi');

class Validation {
  checkLoginBodyIsValid(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .required()
    });

    const { error } = schema.validate(req.body || {});
    // if request body is not valid
    if (error) {
      return res.status(400).send({
        status: 'Bad Request',
        error: {
          name: error.name,
          message: error.details[0].message
        }
      });
    }

    next();
  }

  checkBucketListIsValid(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(1)
        .required(),
      date_created: Joi.date(),
      date_modified: Joi.date()
    });
    const { error } = schema.validate(req.body || {});
    //if bucketList body is not valid
    if (error) {
      return res.status(400).send({
        status: 'Bad Request',
        error: {
          name: error.name,
          message: error.details[0].message
        }
      });
    }

    next();
  }
}

module.exports = new Validation();
