import Joi from 'joi';

export let configSchema = Joi.object().required()
  .keys({
    server: Joi.object().required().keys({
      port: Joi.string().required(),
    }).meta({className: 'serverConfig'}), // so hapi swagger shows non-auto-generated model name.,

    client: Joi.object().required().keys({
      hapiBabelBaseline: Joi.object().required().keys({
        url: Joi.string().required(),
        getTimeout: Joi.number().required()
      })
    }).meta({className: 'clientConfig'}),
  })
  .meta({className: 'configSchema'}); // so hapi swagger shows non-auto-generated model name.
