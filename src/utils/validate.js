import Joi from '@hapi/joi';

export const Name = Joi.string().min(1).max(30).required();
export const Password = Joi.string().min(5).required();
export const Username = Joi.string().alphanum().min(3).max(30).required();
export const Email = Joi.string().email({ tlds: {allow: false} }).required();