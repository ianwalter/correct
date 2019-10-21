const Validation = require('./Validation')
const isEmail = require('isemail')
const isPhone = require('is-phone')
const zxcvbn = require('zxcvbn')
const { parseISO, isValid } = require('date-fns')

module.exports = {
  isString: i => new Validation(typeof i === 'string' && i.length > 0),
  isEmail: (input, options = { minDomainAtoms: 2 }) => new Validation(
    isEmail.validate(input, options)
  ),
  isPhone: input => new Validation(isPhone(input)),
  isDate: input => {
    const date = typeof input === 'string' ? parseISO(input) : input
    return new Validation(isValid(date), date)
  },
  isStrongPassword: (password, inputs) => {
    const result = zxcvbn(password, inputs)
    return new Validation(result.score > 2, result)
  }
}
