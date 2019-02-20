/* eslint-disable quote-props */
import joi from 'joi';

const nameError = (x) => {
  switch (x[0].type) {
    case 'any.empty': {
      return new Error('Name is required ');
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
    case 'any.empty': {
      return new Error('Email is required ');
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
    case 'any.empty': {
      return new Error('Password is required ');
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
    case 'any.empty': {
      return new Error('Phone number is required ');
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
    case 'any.empty': {
      return new Error('Type of office is required ');
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
    case 'any.empty': {
      return new Error('Name is required ');
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
    case 'any.empty': {
      return new Error('Address is required');
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
    case 'any.empty': {
      return new Error('logo url is required');
    }
    case 'string.uri': {
      return new Error('Invalid format of URL');
    }
    default: {
      return new Error('Url has some error');
    }
  }
};


const requiredName = joi.string().trim().regex(/^[a-zA-Z]+$/)
  .min(2)
  .max(30)
  .required()
  .error(nameError);

const name = joi.string().trim().regex(/^[a-zA-Z]+$/).min(2)
  .max(30)
  .error(nameError);

const email = joi.string().email().required().error(EmailError);

const password = joi.string().strip().regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/).required()
  .error(PasswordError);

const requiredType = joi.string().trim().regex(/^[a-zA-Z]+$/).required()
  .error(OfficeTypeError);
const requiredOffice = joi.string().trim().regex(/^[a-z A-Z_]+$/).required()
  .error(OfficeNameError);


export const id = joi.number().integer().positive().error(new Error('Id must be a positive integer'));

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
  userId: id.required(),
  officeId: id.required(),
  candidateId: id.required(),
  partyId: id.required(),

});

export const createVote = joi.object().keys({
  office: id,
  candidate: id,
  voter: id,
});

export const check = (data, schema, res) => {
  joi.validate(data, schema, (err) => {
    if (err) {
      return res.status(422).json({
        'status': 422,
        'error': err.message,
      });
    }
  });
};
