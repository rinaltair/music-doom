const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

/**
 * Validate request body, query, and params against a schema.
 * @param {Object} schema - Joi schema.
 * @param {Object} schema.body - Schema for request body.
 * @param {Object} schema.query - Schema for query parameters.
 * @param {Object} schema.params - Schema for route parameters.
 * @return {Function} - Express middleware function.
 */
const validate = (schema) => (req, res, next) => {
  // Extract the relevant schema parts for validation
  const validSchema = pick(schema, ['params', 'query', 'body', 'file']);
  const object = pick(req, Object.keys(validSchema));

  // Validate the request data against the schema
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  // If validation fails, create an error message and pass it to the next middleware
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // Replace req query/body/params with the validated values
  Object.assign(req, value);
  return next();
};

module.exports = validate;
