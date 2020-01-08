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
const validInput = {
  email: 'yo@fastmail.com',
  name: 'Georgy Zhukov',
  password: '23-01=dwko;qwe2',
  occupation: 'Software General',
  phone: '555-555-5555'
}

test('valid registration', async ({ expect }) => {
  const validation = await registrationValidator.validate(validInput)
  expect(validation.valid()).toBe(true)
  expect(validation.throw()).toBe(true)
})

test('invalid registration', async ({ expect }) => {
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

test('validaion data', async ({ expect }) => {
  const input = {
    ...validInput,
    artist: 'Peach Pit',
    song: 'Feelin Low'
  }
  const validation = await registrationValidator.validate(input)
  expect(validation.data).toEqual(validInput)
})

test('without optional data', async ({ expect }) => {
  const { phone, ...required } = validInput
  const validation = await registrationValidator.validate(required)
  expect(validation.valid()).toBe(true)
})
