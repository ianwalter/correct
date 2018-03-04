const Validation = require('./Validation')
const isEmail = require('isemail')
const isPhone = require('is-phone')
const zxcvbn = require('zxcvbn')
const luxon = require('luxon')

module.exports = {
  isString: i => new Validation(typeof i === 'string' && i.length > 0),
  isEmail: (input, options) => new Validation(isEmail.validate(input, options)),
  isPhone: input => new Validation(isPhone(input)),
  isDate: (input, options) => {
    const date = luxon.fromISO(input, options)
    return new Validation(date.invalid, date)
  },
  isStrongPassword: (password, inputs) => {
    const result = zxcvbn(password, inputs)
    return new Validation(result.score > 2, result)
  }
}
