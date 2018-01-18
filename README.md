# Correct
> Pragmatic validation for Node.js

## Example Usage

### Implementation

```js
const {
  Validator,
  isEmail,
  isString
  isStrongPassword,
  isPhone,
  isOptional,
  ValidationError
} = require('correct')

// Custom validator example:
const mustContainSoftware = occupation => {
  if (!occupation.toLowerCase().includes('software')) {
    return 'Occupation must contain software.'
  }
}

// Create the validator.
const registrationValidator = new Validator({
  email: { isEmail },
  name: { isString },
  password: { isStrongPassword, message: 'Your password must be stronger.' },
  occupation: { mustContainSoftware },
  phone: { isPhone, isOptional, name: 'telephone number' }
})

try {
  // Validate the input.
  const validation = await registrationValidator.validate(req.body)

  // Continue to do something here.
} catch (err) {
  if (err instanceof ValidationError) {
    // If the error is a ValidationError, respond with the invalid results.
    res.status(422).json(validation) // Or just validation.errors
  } else {
    res.status(500)
  }
}
```

### Input (req.body):

```json
{
  "email": "hahahaha",
  "name": "",
  "password": "qwerty",
  "occupation": "CEO",
  "phone: "777",
}
```

### Output (validation):

```js
{
  email: ['A valid email address is required.'],
  name: ['Namew is required.'],
  password: ['Your password must be stronger.'],
  occupation: ['Occupation must contain software.'],
  phone: ['A valid telephone number is required.']
}
```


## Bundled Validators

### Basic Types

Name      | Descriptionn                                                       |
----------|--------------------------------------------------------------------|
isString  | Validates whether input is a String.                               |
isBoolean | Validates whether input is a Boolean.                              |
isInteger | Validates whether input is a Integer.                              |
isFloat   | Validates whether input is a floating point number.                |
isNumber  | Validates whether input is or can be converted to a number.        |
isObject  | Validates whether input is an Object.                              |
isArray   | Validates whether input is an Array.                               |

### Advanced Types

Name             | Descriptionn                                                |
-----------------|-------------------------------------------------------------|
isTimestamp      | Validates whether input is a valid ISO8601 timestamp.       |
                 | Valid example: '2018-01-01T00:00:00.000Z'                   |
isEmail          | Validates whether input is a valid email address.           |
                 | Valid example: sharonjones@hotmail.com                      |
                 | Invalid example: ting#fastmail.com                          |
isPhone          | Validates whether input is a valid phone number.            |
isStrongPassword | Validates whether input is a strong (has a score of 3 or 4) |
                 | password using [zxcvbn](https://github.com/dropbox/zxcvbn)  |
                 | Valid example: 'Dmbu5bc5yeCRwsRD'                           |
                 | Invalid example: 'qwerty'                                   |
isUrl            | Validates whether input is a valid URL.                     |
isZip            | Validates wehther input is a valid zip code.                |


## Non-validator Options

Name       | Description                                                       |
-----------|-------------------------------------------------------------------|
name       | Allows you to customize the name of the field as it appears in    |
           | the error message. If this is not specified, the error message    |
           | will use a default specified by the validator used or the object  |
           | key.                                                              |
message    | Allows you to set the error message.                              |
isOptional | Allows you to mark the field as optional/not required.            |
