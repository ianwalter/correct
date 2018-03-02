const ValidationError = require('./validationError')

module.exports = class Validator {
  constructor (schema) {
    // Save the schema so that it can be used to validate data later.
    this.schema = schema
  }

  validate (data) {
    // Iterate over each field in the schema definition and evaluate the
    // validators they contain on the matching field in data.
    // for (const field of this.schema) {

    // }
    throw new ValidationError()
  }
}
