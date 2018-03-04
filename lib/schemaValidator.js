const ValidationError = require('./validationError')
const Validation = require('./validation')
const decamelize = require('decamelize')

class SchemaValidator {
  constructor (schema) {
    this.fields = {}

    // Iterate over each field in the schema definition and
    //
    for (const [field, options] of Object.entries(schema)) {
      this.fields[field] = {
        name: options.name || decamelize(field, ' '),
        validators: Object.values(options).filter(o => typeof o === 'function'),
        message: options.message,
        isOptional: options.isOptional
      }
    }
  }

  async validate (data) {
    let feedback
    for (const [key, field] of Object.entries(this.fields)) {
      try {
        const value = data[key]
        const message = field.message || `A valid ${field.name} is required.`
        if (value === undefined && !field.isOptional) {
          throw new ValidationError(message)
        } else {
          await field.validators.forEach(v => v(value).throw(message))
        }
      } catch (error) {
        if (feedback && feedback[field]) {
          feedback[field].push(error.message)
        } else {
          feedback = Object.assign(feedback || {}, { [field]: [error.message] })
        }
      }
    }
    return new Validation(feedback)
  }
}

module.exports = { SchemaValidator, isOptional: true }
