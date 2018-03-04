const BaseError = require('@ianwalter/base-error')

const defaultMessage = 'Validation has failed'

module.exports = class ValidationError extends BaseError {
  constructor (message, feedback) {
    super(message && typeof message === 'string' ? message : defaultMessage)
    this.feedback = feedback
  }
}
