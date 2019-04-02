import joi from 'joi';
import * as schema from '../helpers/schema';
const validate = (value, scheme , res) => {
    joi.validate(value, scheme , { abortEarly: false, stripUnknown: true }, (err) => {
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

      next()
      });
  }
class validation {
  static signup(req, res, next){validate (req.body, schema.signupSchema , res)}

  static login(req, res, next) { validate (req.body , schema.loginSchema , res) }

  static forgotPassword(req, res, next) { validate (req.body , schema.forgotpasswordSchema , res)  }

  static changePassword(req, res, next) { validate (req.body , schema.changePasswordSchema , res) }

  static resetPassword(req, res, next) { validate (req.body , schema.resetPasswordSchema , res) }

  static editProfile(req, res, next) { validate (req.body , schema.editProfileSchema , res) }

  static createParty(req, res, next) { validate (req.body , schema.createPartySchema , res) }

  static editParty(req, res, next) { validate (req.body , schema.editPartySchema , res) }

  static checkId(req, res, next) { validate (req.params.id , schema.id, res) }

  static createOffice(req, res, next) { validate (req.body , schema.createOfficeSchema, res)}

  static editOffice(req, res, next) { validate (req.body , schema.editOfficeSchema, res )}

  static createInterest(req, res, next) { validate (req.body , schema.createInterestSchema, res)};

  static editInterest(req, res, next)  { validate (req.body , schema.editInterestSchema, res )};

  static createPetition(req, res, next) { validate (req.body , schema.createPetitionSchema, res)}

  static editPetition(req, res, next) { validate (req.body , schema.editPetitionSchema, res )}

  static createVote(req, res, next) { validate (req.body , schema.createVoteSchema, res )}

  static createCandidate(req, res, next) { validate (req.body , schema.createCandidateSchema, res)}

}
export default validation;

