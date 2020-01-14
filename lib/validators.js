const isEmail = require('isemail')
const isPhone = require('is-phone')
const zxcvbn = require('zxcvbn')
const { parseISO, isValid } = require('date-fns')
const merge = require('@ianwalter/merge')

const emailOpts = { minDomainAtoms: 2 }

module.exports = {
  isString: input => typeof input === 'string' && input.length > 0,
  isEmail: (input, opts) => isEmail.validate(input, merge({}, emailOpts, opts)),
  isPhone,
  isDate: input => isValid(typeof input === 'string' ? parseISO(input) : input),
  isStrongPassword: (password, inputs) => {
    const result = zxcvbn(password, inputs)
    return result.score > 2
  }
}
