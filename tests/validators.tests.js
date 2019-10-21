const { test } = require('@ianwalter/bff')
const { 
  ValidationError, 
  isString, 
  isEmail,
  isPhone,
  isDate
} = require('..')

test('isString', ({ expect }) => {
  expect(isString('Parker').valid()).toBe(true)
  expect(isString(2018).valid()).toBe(false)
  expect(isString('Harmony Hall').throw()).toBe(true)
  expect(() => isString({}).throw()).toThrowError(ValidationError)
  expect(() => isString([]).throw('Wrong!')).toThrowError('Wrong!')
})

test('isEmail', ({ expect }) => {
  expect(isEmail('guy@example.com').valid()).toBe(true)
  expect(isEmail('guy@').valid()).toBe(false)
  expect(isEmail('guy@example').valid()).toBe(false)
})

test('isPhone', ({ expect }) => {
  expect(isPhone('617-555-5555').valid()).toBe(true)
  expect(isPhone('6175555555').valid()).toBe(true)
  expect(isPhone('(617) 555-5555').valid()).toBe(true)
  expect(isPhone('617-555-555').valid()).toBe(false)
})

test('isDate', ({ expect }) => {
  expect(isDate('2019-10-21T03:13:20.796Z').valid()).toBe(true)
  expect(isDate('209').valid()).toBe(false)
  expect(isDate(new Date()).valid()).toBe(true)
})
