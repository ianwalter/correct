const ValidationError = require('./validationError')

module.exports = class Validation {
  constructor (feedback) {
    if (typeof feedback === 'string' || feedback === false) {
      this.feedback = feedback
    }
  }

  valid () {
    return this.feedback === undefined
  }

  except (message) {
    if (this.feedback === undefined) {
      return true
    }
    throw new ValidationError(message || '', this.feedback)
  }
}
