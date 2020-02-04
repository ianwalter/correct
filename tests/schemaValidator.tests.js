const { test } = require('@ianwalter/bff')
const {
  isString,
  isEmail,
  isPhone,
  isStrongPassword,
  isOptional,
  SchemaValidator
} = require('..')

const containsSoftware = {
  validate: occupation => ({
    isValid: occupation.toLowerCase().includes('software'),
    message: 'Occupation must contain software.'
  })
}
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
  expect(validation.isValid).toBe(true)
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
  expect(validation.isValid).toBe(false)
  expect(validation).toMatchSnapshot({
    validations: {
      password: {
        result: expect.any(Object)
      }
    }
  })
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
  expect(validation.isValid).toBe(true)
})
