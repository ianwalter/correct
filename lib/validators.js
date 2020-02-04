const isPhone = require('is-phone')

function resultIsValid (result) {
  return result.isValid
}

function isString (input) {
  return resultIsValid(isString.validate(input))
}
isString.validate = function validateString (input) {
  return { isValid: typeof input === 'string' && input.length > 0 }
}

const defaultEmailOptions = { minDomainAtoms: 2 }
function isEmail (input, options) {
  return resultIsValid(isEmail.validate(input, options))
}
isEmail.validate = function validateEmail (input, options) {
  const { validate } = require('isemail')
  const merge = require('@ianwalter/merge')
  return { isValid: validate(input, merge({}, defaultEmailOptions, options)) }
}

function isDate (input) {
  return resultIsValid(isDate.validate(input))
}
isDate.validate = function validateDate (input) {
  const { parseISO, isValid } = require('date-fns')
  return {
    isValid: isValid(typeof input === 'string' ? parseISO(input) : input)
  }
}

function isStrongPassword (password, inputs) {
  return resultIsValid(isStrongPassword.validate(password, inputs))
}
isStrongPassword.validate = function validateStrongPassword (password, inputs) {
  const zxcvbn = require('zxcvbn')
  const result = zxcvbn(password, inputs)
  return {
    isValid: result.score > 2,
    message: result.feedback.warning,
    feedback: result.feedback.suggestions,
    result
  }
}

module.exports = { isString, isEmail, isPhone, isDate, isStrongPassword }
