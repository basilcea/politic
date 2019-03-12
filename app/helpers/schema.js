import joi from 'joi';

export const email = joi.string().trim().email().invalid('')
  .required()
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

export const password = joi.string().trim().invalid('').regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
  .required()
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

export const id = joi.number().invalid('').required()
  .integer()
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
  phoneNumber: joi.string().trim().invalid('').regex(/^[0]\d{10}$/)
    .required()
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
  passportUrl: joi.string().trim().invalid('').uri()
    .required()
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
  confirmPassword: joi.string().trim().valid(joi.ref('password')).required()
    .strict()
    .error(() => 'Password does not match'),
  registerAs: joi.string().valid('voter', 'politician').trim().required()
    .error(() => 'RegisterAs value must be either voter or politician'),
});

export const loginSchema = joi.object().keys({
  email,
  password,
});

export const editProfileSchema = joi.object().keys({
  firstname: joi.string().trim().allow('').regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(15)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
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
  phoneNumber: joi.string().trim().allow('').regex(/^[0]\d{10}$/)
    .error(() => 'Phone number must start with 0 and be 11 digits'),
  passportUrl: joi.string().trim().allow('').uri()
    .error(() => 'Invalid passport url'),
  email: joi.string().trim().email().allow('')
    .error(() => 'incorrect email format. e.g eaxmple@mymail.com'),
  registerAs: joi.string().valid('voter', 'politician').trim().allow('')
    .error(() => 'RegisterAs value must be either voter or politician'),
});
export const changePasswordSchema = joi.object().keys({
  oldPassword: password,
  newPassword: password,
  confirmPassword: joi.string().trim().valid(joi.ref('newPassword')).required()
    .strict()
    .error(() => 'Password does not match'),
});

export const resetPasswordSchema = joi.object().keys({
  id,
  newPassword: password,
  confirmPassword: joi.string().trim().valid(joi.ref('newPassword')).required()
    .strict()
    .error(() => 'Password does not match'),
});

export const forgotpasswordSchema = joi.object().keys({ email });


export const createPartySchema = joi.object().keys({
  name: joi.string().invalid('').trim().regex(/^[a-z A-Z ]+$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Party name field is required';
            break;
          case 'any.empty':
            err.message = 'Party name should not be empty!';
            break;
          case 'string.regex.base':
            err.message = 'Party name should contain only letters and spaces';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  hqAddress: joi.string().trim().regex(/^[A-Za-z0-9- ]+$/).required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'HQ Address field is required';
            break;
          case 'any.empty':
            err.message = 'HQ Address should not be empty!';
            break;
          case 'string.regex.base':
            err.message = 'HQ Address should contain only number, letters and spaces';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  logoUrl: joi.string().trim().uri().required()
    .error(
      (errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case 'any.required':
              err.message = 'Logo field is required';
              break;
            case 'any.empty':
              err.message = 'You need to upload a party Logo';
              break;
            case 'string.uri':
              err.message = 'Logo must be a url';
              break;
            default:
              break;
          }
        });
        return errors;
      },
    ),
});

export const editPartySchema = joi.object().keys({
  name: joi.string().allow('').trim().regex(/^[a-z A-Z ]+$/)
    .error(() => 'Party name should contain only letters and spaces'),
  hqAddress: joi.string().trim().regex(/^[A-Za-z0-9- ]+$/).allow('')
    .error(() => 'HQ Address should contain only number, letters and spaces'),
  logoUrl: joi.string().trim().uri().allow('')
    .error(() => 'Logo must be a url'),
});

export const createOfficeSchema = joi.object().keys({
  type: joi.string().invalid('').trim().regex(/^[a-z A-Z ]+$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'office type field is required';
            break;
          case 'any.empty':
            err.message = 'office type should not be empty!';
            break;
          case 'string.regex.base':
            err.message = 'office type should contain only letters and spaces';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  name: joi.string().invalid('').trim().regex(/^[a-z A-Z ]+$/)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'office name field is required';
            break;
          case 'any.empty':
            err.message = 'office name should not be empty!';
            break;
          case 'string.regex.base':
            err.message = 'office name should contain only letters and spaces';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  electDate: joi.date().iso().greater('now').allow('')
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Date field is required';
            break;
          case 'date.greater':
            err.message = 'Date must be greater than today';
            break;
          case 'date.base':
            err.message = 'Value is not a date or cannot be cast to a date';
            break;
          case 'date.isoDate':
            err.message = 'Date should be in the format <yyyy-mm-dd>';
            break;
          default:
            break;
        }
      });
      return errors;
    }),

});

export const editOfficeSchema = joi.object().keys({
  type: joi.string().allow('').trim().regex(/^[a-z A-Z ]+$/)
    .error(() => 'office type should contain only letters and spaces'),
  name: joi.string().allow('').trim().regex(/^[a-z A-Z ]+$/)
    .error(() => 'office name should contain only letters and spaces'),
  electDate: joi.date().iso().greater('now').allow('')
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Date field is required';
            break;
          case 'date.greater':
            err.message = 'Date must be greater than today';
            break;
          case 'date.base':
            err.message = 'Value is not a date or cannot be cast to a date';
            break;
          case 'date.isoDate':
            err.message = 'Date should be in the format <yyyy-mm-dd>';
            break;
          default:
            break;
        }
      });
      return errors;
    }),

});
