const ValidationError = require('./validationError')

module.exports = {
  isString: input => {
    const isString = typeof input === 'string' && input.length > 0
    return {
      valid: () => isString,
      except: message => {
        if (!isString) {
          throw new ValidationError(message || '')
        }
        return isString
      }
    }
  }
}
