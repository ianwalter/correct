const decamelize = require('decamelize')
const { Print } = require('@ianwalter/print')
const ValidationError = require('./ValidationError')
const Validation = require('./Validation')

const defaults = { logLevel: 'info', failFast: 0 }

module.exports = class SchemaValidator {
  constructor (schema, options) {
    this.fields = {}

    // Merge the given options with the defaults.
    this.options = Object.assign({}, defaults, options)

    // Set up a print instance with the given/default log level.
    this.print = new Print({ level: this.options.logLevel })

    // Convert the fields in the schema definition to objects that can be used
    // to validate data.
    this.print.debug('Schema', schema)
    for (const [field, options] of Object.entries(schema)) {
      this.fields[field] = {
        name: options.name || decamelize(field, ' '),
        validators: Object.values(options).filter(o => typeof o === 'function'),
        message: options.message,
        isOptional: options.isOptional
      }
    }
  }

  async validate (input) {
    const feedback = {}
    const data = {}

    for (const [key, field] of Object.entries(this.fields)) {
      try {
        data[key] = input[key]
        const message = field.message || `A valid ${field.name} is required.`
        if (data[key] === undefined && !field.isOptional) {
          throw new ValidationError(message)
        } else if (data[key] !== undefined) {
          await Promise.all(field.validators.map(
            validator => validator(data[key]).throw(message)
          ))
        }
      } catch (err) {
        this.print.debug(err)
        if (feedback[key]) {
          feedback[key].push(err.message)
        } else {
          feedback[key] = [err.message]
        }

        if (this.options.failFast > 0) {
          break
        }
      }
    }

    return new Validation(feedback, data)
  }
}
