const ValidationError = require('./ValidationError')

module.exports = class Validation {
  constructor (feedback, data) {
    if (
      typeof feedback === 'string' ||
      feedback === false ||
      (Array.isArray(feedback) && feedback.length) ||
      (typeof feedback === 'object' && Object.keys(feedback).length)
    ) {
      this.feedback = feedback
    }
    this.data = data
  }

  valid () {
    return this.feedback === undefined
  }

  throw (message) {
    if (this.feedback === undefined) {
      return true
    }
    throw new ValidationError(message, this.feedback)
  }
}
