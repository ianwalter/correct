const ValidationError = require('../lib/validationError')
const { isString } = require('../lib/validators')

const name = 'Coleman'
const year = 2018

describe('validators', () => {
  describe('isString()', () => {
    describe('.valid()', () => {
      test('returns true when valid', () => {
        expect(isString(name).valid()).toBe(true)
      })

      test('returns false when invalid', () => {
        expect(isString(year).valid()).toBe(false)
      })
    })

    describe('.orThrow()', () => {
      test('returns true when valid', () => {
        expect(isString(name).except()).toBe(true)
      })

      test('throws a ValidationError when invalid', () => {
        expect(() => isString(year).except()).toThrowError(ValidationError)
      })

      test('throws a custom message ValidationError when invalid', () => {
        expect(() => isString(year).except('Wrong!')).toThrowError('Wrong!')
      })
    })
  })
})
