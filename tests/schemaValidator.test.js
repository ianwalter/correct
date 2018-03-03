import { SchemaValidator, isOptional } from '../lib/schemaValidator'
import { isEmail, isString, isStrongPassword, isPhone } from '../lib/validators'
import ValidationError from '../lib/validationError'

const invalidJson = {
  // "email": "hahahaha",
  "name": ""
  // "password": "qwerty",
  // "occupation": "CEO",
  // "phone": "777"
}

const validJson = {
  // "email": "yo@fastmail.com",
  "name": "Georgy Zhukov"
  // "password": "23-01=dwko;qwe2",
  // "occupation": "Software General",
  // "phone": "555-555-5555"
}

// // Custom validator example:
// const containsSoftware = occupation => {
//   if (!occupation.toLowerCase().includes('software')) {
//     return 'Occupation must contain software.'
//   }
// }

const registrationValidator = new SchemaValidator({
  // email: { isEmail },
  name: { isString }
  // password: { isStrongPassword, message: 'Your password must be stronger.' },
  // occupation: { containsSoftware },
  // phone: { isPhone, isOptional, name: 'telephone number' }
})

describe('Validator', () => {
  describe('.validate()', () => {
    describe('when data is valid', () => {
      let validation
      beforeAll(async () => {
        validation = await registrationValidator.validate(validJson)
      })

      test('.valid() returns true', () => {
        expect(validation.valid()).toBe(true)
      })

      test('.except() returns true', () => {
        expect(validation.except()).toBe(true)
      })
    })

    describe('when data is invalid', () => {
      let validation
      beforeAll(async () => {
        validation = await registrationValidator.validate(invalidJson)
      })

      test('.valid() returns false', () => {
        expect(validation.valid()).toBe(false)
      })

      test('.except() throws ValidationErrror', () => {
        expect(() => validation.except()).toThrowError(ValidationError)
      })
    })
  })
})
