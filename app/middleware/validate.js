import joi from 'joi';
import * as schema from '../helpers/schema';

class validation {
  static signup(req, res, next) {
    joi.validate(req.body, schema.signupSchema, { abortEarly: false, stripUnknown: true }, (err) => {
      if (err) {
        const errMsg = [];
        for (let i = 0; i < err.details.length; i++) {
          errMsg.push(err.details[i].message);
        }
        return res.status(400).json({
          status: 400,
          error: errMsg,
        });

      }
      next();

    });
  }

  static login(req, res, next) {
    joi.validate(req.body, schema.loginSchema, { abortEarly: false, stripUnknown: true }, (err) => {

      if (err) {
        const errMsg = [];
        for (let i = 0; i < err.details.length; i++) {
          errMsg.push(err.details[i].message);
        }
        return res.status(400).json({
          status: 400,
          error: errMsg,
        });

      }
      next();
    });


  }

  static forgotPassword(req, res, next) {
    joi.validate(req.body, schema.forgotpasswordSchema, { abortEarly: false, stripUnknown: true }, (err) => {
      if (err) {
        const errMsg = [];
        for (let i = 0; i < err.details.length; i++) {
          errMsg.push(err.details[i].message);
        }
        return res.status(400).json({
          status: 400,
          error: errMsg,
        });

      }
      next();
    });


  }

  static changePassword(req, res, next) {
    joi.validate(req.body, schema.changePasswordSchema, { abortEarly: false, stripUnknown: true }, (err) => {

      if (err) {
        const errMsg = [];
        for (let i = 0; i < err.details.length; i++) {
          errMsg.push(err.details[i].message);
        }
        return res.status(400).json({
          status: 400,
          error: errMsg,
        });

      }
      next();
    });


  }

  static resetPassword(req, res, next) {
    joi.validate(req.body, schema.resetPasswordSchema, { abortEarly: false, stripUnknown: true }, (err) => {

      if (err) {
        const errMsg = [];
        for (let i = 0; i < err.details.length; i++) {
          errMsg.push(`${err.details[i].message} `);
        }
        return res.status(400).json({
          status: 400,
          error: errMsg,
        });

      }
      next();
    });


  }


  static editProfile(req, res, next) {
    joi.validate(req.body, schema.editProfileSchema, { abortEarly: false, stripUnknown: true }, (err) => {

      if (err) {
        const errMsg = [];
        for (let i = 0; i < err.details.length; i++) {
          errMsg.push(`${err.details[i].message} `);
        }
        return res.status(400).json({
          status: 400,
          error: errMsg,
        });

      }
      next();
    });


  }

}
export default validation;
