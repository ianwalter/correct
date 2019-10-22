const { test } = require('@ianwalter/bff')
const { 
  isString,
  isEmail,
  isPhone,
  isStrongPassword,
  isOptional,
  SchemaValidator,
  Validation,
  ValidationError
} = require('..')

const msg = 'Occupation must contain software.'
const containsSoftware = occupation => (
  new Validation(occupation.toLowerCase().includes('software') || msg)
)
const registrationValidator = new SchemaValidator({
  email: { isEmail },
  name: { isString },
  password: { isStrongPassword, message: 'Your password must be stronger.' },
  occupation: { containsSoftware },
  phone: { isPhone, isOptional, name: 'telephone number' }
})

test('valid registration', async ({ expect }) => {
  const input = {
    email: 'yo@fastmail.com',
    name: 'Georgy Zhukov',
    password: '23-01=dwko;qwe2',
    occupation: 'Software General',
    phone: '555-555-5555'
  }
  const validation = await registrationValidator.validate(input)
  expect(validation.valid()).toBe(true)
  expect(validation.throw()).toBe(true)
})

test('invalid registration', async ({ expect, print }) => {
  const input = {
    email: 'hahaha',
    name: '',
    password: 'qwerty',
    occupation: 'CEO',
    phone: '777'
  }
  const validation = await registrationValidator.validate(input)
  expect(validation.valid()).toBe(false)
  try {
    validation.throw()
  } catch (err) {
    expect(err instanceof ValidationError).toBe(true)
    expect(err.feedback).toMatchSnapshot()
  }
})
