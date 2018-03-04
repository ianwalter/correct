const Validation = require('./Validation')
const isEmail = require('isemail')

module.exports = {
  isString: i => new Validation(typeof i === 'string' && i.length > 0),
  isEmail: (input, options) => isEmail.validate(input, options)
}
