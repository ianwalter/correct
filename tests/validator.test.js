import Validator from '../lib/validator'
import ValidationError from '../lib/validationError'

const invalidJson = {
  "email": "hahahaha",
  "name": "",
  "password": "qwerty",
  "occupation": "CEO",
  "phone": "777"
}

const registrationValidator = new Validator({
  // email: { isEmail },
  // name: { isString },
  // password: { isStrongPassword, message: 'Your password must be stronger.' },
  // occupation: { mustContainSoftware },
  // phone: { isPhone, isOptional, name: 'telephone number' }
})

describe('Validator', () => {
  describe('.validate()', () => {
    test('throws ValidationError when input is invalid', () => {
      const validation = () => registrationValidator.validate(invalidJson)
      expect(validation).toThrow(ValidationError)
    })
  })
})
