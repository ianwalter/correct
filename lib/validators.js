const isPhone = require('is-phone')

function isString (input) {
  return typeof input === 'string' && input.length > 0
}

const defaultEmailOptions = { minDomainAtoms: 2 }
function isEmail (input, options) {
  const isEmail = require('isemail')
  const merge = require('@ianwalter/merge')
  return isEmail.validate(input, merge({}, defaultEmailOptions, options))
}

function isDate (input) {
  const { parseISO, isValid } = require('date-fns')
  return isValid(typeof input === 'string' ? parseISO(input) : input)
}

function isStrongPassword (password, inputs) {
  const zxcvbn = require('zxcvbn')
  const result = zxcvbn(password, inputs)
  return result.score > 2
}

module.exports = { isString, isEmail, isPhone, isDate, isStrongPassword }
