const CustomError = require('./customError')

const defaultMessage = 'Validation has failed'

module.exports = class ValidationError extends CustomError {
  constructor (message, feedback) {
    super(message && typeof message === 'string' ? message : defaultMessage)
    this.feedback = feedback
  }
}
