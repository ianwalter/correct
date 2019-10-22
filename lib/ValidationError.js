const BaseError = require('@ianwalter/base-error')

class ValidationError extends BaseError {
  constructor (message, feedback) {
    super(message || ValidationError.defaultMessage)
    this.feedback = feedback
  }
}

ValidationError.defaultMessage = 'Validation has failed'

module.exports = ValidationError
