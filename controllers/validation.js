/**
 * A module for run JSON Schema base validation on request or response data.
 * @author Wang Ka Li
 * @module controllers/validation
 * @see schemas/* for JSON Schema definition files
 */

const { Validator, ValidationError } = require('jsonschema');
const dogSchema = require('../schemas/dogs.schema.js');
const userSchema = require('../schemas/users.schema.js');

const v = new Validator();

exports.validateDog = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false,
  };
  const { body } = ctx.request;
  try {
    v.validate(body, dogSchema, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error;
      ctx.status = 400;
    } else {
      throw error;
    }
  }
};

exports.validateUser = async (ctx, next) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false,
  };
  const { body } = ctx.request;
  try {
    v.validate(body, userSchema, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error;
      ctx.status = 400;
    } else {
      throw error;
    }
  }
};
