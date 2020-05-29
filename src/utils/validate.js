import Joi from '@hapi/joi';

export const Name = Joi.string().min(1).max(30).required();
export const Password = Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')).required();
export const Username = Joi.string().alphanum().min(3).max(30).required();
export const Email = Joi.string().email({ tlds: {allow: false} }).required();