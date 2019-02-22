/* eslint-disable linebreak-style */
/* eslint-disable quote-props */
import joi from 'joi';

const nameError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Name field is required');
    }
    case 'any.empty': {
      return new Error('Name cannot be empty');
    }
    case 'string.regex.base': {
      return new Error('Invalid format. Name Must be letters only');
    }
    case 'string.min': {
      return new Error('Name must be least 2 characters ');
    }
    case 'string.max': {
      return new Error('Name must be maximum of 30 characters ');
    }
    default: {
      return new Error('Name has some error');
    }
  }
};

const EmailError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Email field is required');
    }
    case 'any.empty': {
      return new Error('Email cannot be empty');
    }
    case 'string.email': {
      return new Error('Invalid email Format');
    }
    default: {
      return new Error('Email has some error');
    }
  }
};

const PasswordError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Password field is required');
    }
    case 'any.empty': {
      return new Error('Password cannot be empty');
    }
    case 'string.regex.base': {
      return new Error('Invalid format. Must be between 6 and 15 digits  contining letters and numbers');
    }
    default: {
      return new Error('Password has some error');
    }
  }
};

const PhoneError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Phone Number field is required');
    }
    case 'any.empty': {
      return new Error('Phone number cannot be empty');
    }
    case 'string.regex.base': {
      return new Error('Invalid format. Must be between 11 digits and starts with 0');
    }
    default: {
      return new Error('Phone number has some error');
    }
  }
};

const OfficeTypeError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Type of office fielc is required');
    }
    case 'any.empty': {
      return new Error('Type of office is not empty');
    }
    case 'string.regex.base': {
      return new Error('Invalid format. Type of office must letters only');
    }
    default: {
      return new Error('Type of office has some error');
    }
  }
};
const OfficeNameError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Office name field is required');
    }
    case 'any.empty': {
      return new Error('Office name cannot be empty');
    }
    case 'string.regex.base': {
      return new Error('Invalid format. Name must contain only letters, spaces and underscores only');
    }
    default: {
      return new Error('Name of office has some error');
    }
  }
};

const hqAddressError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Address field is required');
    }
    case 'any.empty': {
      return new Error('Address is not empty');
    }
    case 'string.regex.base': {
      return new Error('Invalid format. Name must contain only letters, Numbers and spaces only');
    }
    default: {
      return new Error('HQ address has some error');
    }
  }
};
const urlError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Logo url field is required');
    }
    case 'any.empty': {
      return new Error('logo url cannot be empty');
    }
    case 'string.uri': {
      return new Error('Invalid format of URL');
    }
    default: {
      return new Error('Url has some error');
    }
  }
};

const idError = (x) => {
  switch (x[0].type) {
    case 'any.required': {
      return new Error('Id field is required');
    }
    case 'any.empty': {
      return new Error('Id cannot be empty');
    }
    case 'number.integer': {
      return new Error('Id must be an integer');
    }
    case 'number.positive': {
      return new Error('Id must be positive');
    }
    default: {
      return new Error('Id has some error');
    }
  }
};
const requiredName = joi.string().trim().invalid('').regex(/^[a-zA-Z]+$/)
  .min(2)
  .max(30)
  .required()
  .error(nameError);

const name = joi.string().trim().regex(/^[a-zA-Z]+$/).min(2)
  .max(30)
  .error(nameError);

const email = joi.string().email().invalid('').required()
  .error(EmailError);

const password = joi.string().invalid('').regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/).required()
  .error(PasswordError);

const requiredType = joi.string().invalid('').trim().regex(/^[a-zA-Z]+$/)
  .required()
  .error(OfficeTypeError);
const requiredOffice = joi.string().invalid('').trim().regex(/^[a-z A-Z_]+$/)
  .required()
  .error(OfficeNameError);


export const id = joi.number().invalid('').required().integer()
  .positive()
  .error(idError);
export const string = joi.string().error(new Error('value must be a string'));

export const value = joi.string().regex(/^[a-zA-Z]+$/).error(new Error('Parameter must be Letters only'));

export const signupSchema = joi.object().keys({
  firstname: requiredName,
  lastname: name,
  othername: name,
  phoneNumber: joi.string().regex(/^[0]\d{10}$/).required().error(PhoneError),
  email,
  password,
  confirmPassword: joi.string().valid(joi.ref('password')).required().strict()
    .error(new Error('Password does not match')),
  registerAs: joi.string().valid('voter', 'politician').trim().required()
    .error(new Error('Value must be either voter or politician')),
  isAdmin: joi.boolean().truthy('yes').falsy('no').insensitive(false)
    .default(false)
    .error(new Error('Must be either True or false, yes or no')),
});

export const loginSchema = joi.object().keys({
  email,
  password: joi.string().required().error(new Error('Password is required')),
});

export const createPartySchema = joi.object().keys({
  name: requiredOffice,
  hqAddress: joi.string().trim().regex(/^[A-Za-z0-9- ]+$/).required()
    .error(hqAddressError),
  logoUrl: joi.string().trim().uri().required()
    .error(urlError),
});


export const editPartySchema = joi.object().keys({
  name,
  hqAddress: joi.string().trim().regex(/^[A-Za-z0-9- ]+$/)
    .error(hqAddressError),
  logoUrl: joi.string().trim().uri()
    .error(urlError),
});

export const createOfficeSchema = joi.object().keys({
  type: requiredType,
  office: requiredOffice,

});

export const createCandidateSchema = joi.object().keys({
  userId: id,
  officeId: id,
  candidateId: id,
  partyId: id,

});


export const createPetitionSchema = joi.object().keys({
  office: id,
  subject: string.required(),
  body: string.required(),
  evidence: joi.array().items(joi.string().allow('').uri()).single(),
});

export const editPetitionSchema = joi.object().keys({
  office: id.allow(''),
  subject: string.allow('').required(),
  body: string.allow('').required(),
  evidence: joi.array().items(joi.string().uri().allow('')).single(),
});

export const createInterestSchema = joi.object().keys({
  office: id,
  party: id,
});

export const editInterestSchema = joi.object().keys({
  office: id.allow(''),
  party: id.allow(''),
});


export const createVote = joi.object().keys({
  office: id,
  candidate: id,
  voter: id,
});

export const check = (data, schema, res) => {
  joi.validate(data, schema, { stripUnknown: true }, (err) => {
    if (err) {
      return res.status(422).json({
        'status': 422,
        'error': err.message,
      });
    }
  });
};
