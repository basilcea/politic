import joi from 'joi';

export const email = joi.string().email().invalid('').required()
  .error(
    (errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Email field is required';
            break;
          case 'any.empty':
            err.message = 'email cannot be empty';
            break;
          case 'string.email':
            err.message = 'incorrect email format. e.g eaxmple@mymail.com';
            break;
          default:
            break;
        }
      });
      return errors;
    },
  );

export const password = joi.string().invalid('').regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/).required()
  .error(
    (errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'password field is required';
            break;
          case 'any.empty':
            err.message = 'password cannot be empty';
            break;
          case 'string.regex.base':
            err.message = 'Password must be beween 6 and 15 characters and contain letters and numbers ';
            break;
          default:
            break;
        }
      });
      return errors;
    },
  );

export const id = joi.number().invalid('').required().integer()
  .positive()
  .error((errors) => {
    errors.forEach((err) => {
      switch (err.type) {
        case 'any.required':
          err.message = 'id is required';
          break;
        case 'any.empty':
          err.message = 'id cannot be empty';
          break;
        case 'number.integer':
          err.message = 'id must be an integer';
          break;
        case 'number.positive':
          err.message = 'id must be a positive number';
          break;
        default:
          break;
      }
    });
    return errors;
  });
export const signupSchema = joi.object().keys({
  firstname: joi.string().trim().invalid('').regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(15)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'first name field is required';
            break;
          case 'any.empty':
            err.message = 'first name should not be empty!';
            break;
          case 'string.min':
            err.message = `first name should have at least ${err.context.limit} characters!`;
            break;
          case 'string.regex.base':
            err.message = 'first name should only contain letters';
            break;
          case 'string.max':
            err.message = `first name  should have at most ${err.context.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  lastname: joi.string().trim().allow('').regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(15)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.min':
            err.message = `last name should have at least ${err.context.limit} characters!`;
            break;
          case 'string.regex.base':
            err.message = 'last name should only contain letters';
            break;
          case 'string.max':
            err.message = `last name  should have at most ${err.context.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  othername: joi.string().trim().allow('').regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(15)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'string.min':
            err.message = `other name should have at least ${err.context.limit} characters!`;
            break;
          case 'string.regex.base':
            err.message = 'other name should only contain letters';
            break;
          case 'string.max':
            err.message = `other name  should have at most ${err.context.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  phoneNumber: joi.string().invalid('').regex(/^[0]\d{10}$/).required()
    .error(
      (errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'any.required':
              err.message = 'Phone number field is required';
              break;
            case 'any.empty':
              err.message = 'Phone number cannot be empty';
              break;
            case 'string.regex.base':
              err.message = 'Phone number must start with 0 and be 11 digits';
              break;
            default:
              break;
          }
        });
        return errors;
      },
    ),
  passportUrl: joi.string().invalid('').uri().required()
    .error(
      (errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'any.required':
              err.message = 'Passport field is required';
              break;
            case 'any.empty':
              err.message = 'You need to upload a passport';
              break;
            case 'string.uri':
              err.message = 'invalid url';
              break;
            default:
              break;
          }
        });
        return errors;
      },
    ),
  email,
  password,
  confirmPassword: joi.string().valid(joi.ref('password')).required().strict()
    .error(() => 'Password does not match'),
  registerAs: joi.string().valid('voter', 'politician').trim().required()
    .error(() => 'Value must be either voter or politician'),
});

export const loginSchema = joi.object().keys({
  email,
  password: joi.string().required().error(() => 'Password is required'),
});


export const changePasswordSchema = joi.object().keys({
  oldPassword: password,
  newPassword: password,
  confirmPassword: joi.string().valid(joi.ref('newPassword')).required().strict()
    .error(() => 'Password does not match'),
});

export const resetPasswordSchema = joi.object().keys({
  id,
  newPassword: password,
  confirmPassword: joi.string().valid(joi.ref('newPassword')).required().strict()
    .error(() => 'Password does not match'),
});

export const forgotpasswordSchema = joi.object().keys({ email });
