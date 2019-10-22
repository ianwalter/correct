const decamelize = require('decamelize')
const { Print } = require('@ianwalter/print')
const ValidationError = require('./ValidationError')
const Validation = require('./Validation')

const defaults = { logLevel: 'info', failFast: 0 }

module.exports = class SchemaValidator {
  constructor (schema, options) {
    this.fields = {}

    this.options = Object.assign(defaults, options)

    this.print = new Print({ level: this.options.logLevel })

    // Iterate over each field in the schema definition and
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
    const feedback = {}
    for (const [key, field] of Object.entries(this.fields)) {
      try {
        const value = data[key]
        const message = field.message || `A valid ${field.name} is required.`
        if (value === undefined && !field.isOptional) {
          throw new ValidationError(message)
        } else {
          await Promise.all(field.validators.map(v => v(value).throw(message)))
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
    return new Validation(feedback)
  }
}
