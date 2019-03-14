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

  static createParty(req, res, next) {
    joi.validate(req.body, schema.createPartySchema, { abortEarly: false, stripUnknown: true }, (err) => {

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

  static editParty(req, res, next) {
    joi.validate(req.body, schema.editPartySchema, { abortEarly: false, stripUnknown: true }, (err) => {

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

  static checkId(req, res, next) {
    joi.validate(req.params.id, schema.id, { abortEarly: false, stripUnknown: true }, (err) => {

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


  static createOffice(req, res, next) {
    joi.validate(req.body, schema.createOfficeSchema, { abortEarly: false, stripUnknown: true }, (err) => {

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

  static editOffice(req, res, next) {
    joi.validate(req.body, schema.editOfficeSchema, { abortEarly: false, stripUnknown: true }, (err) => {

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

static createInterest(req, res, next) {
  joi.validate(req.body, schema.createInterestSchema, { abortEarly: false, stripUnknown: true }, (err) => {

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
  
  static editInterest(req, res, next) {
    joi.validate(req.body, schema.editInterestSchema, { abortEarly: false, stripUnknown: true }, (err) => {
  
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

