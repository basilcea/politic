import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"
/**
  * Represents a controller  class for all user specific acitvities
  * @class userController
  * @method signup
 */

class userController {
  /*---------------- User methods ---------------------------*/

  /**
    * Create  a user
    * @async requestPromises
    * @method signup
    * @params {object} request - The form data to be inputted
    * @return {object} response - The status code and data to be outputted if input passes validation
    * @return {object} response - The status code and error message to be outputted fails validation.
    *
   */
  static async signup( req, res ) {

    // Sql query for inserting into user table
    const createUser = `INSERT INTO users(firstname, lastname, othername, email,phoneNumber, passportURL,
    password,registerAs,isAdmin)
    VALUES($1, $2, $3,$4, $5, $6 ,$7, $8, $9)`;

    // Sql query for  login users
    const loginUser = `SELECT * FROM users WHERE email = $1`;

    // hashpassword from helper class
    const hashPassword = authHelper.hashPassword(req.body.password);
    const getUser =`SELECT firstname from users`;
    const users= await pool.query(getUser);
    const getEmail=`SELECT email from users`;
    const email= await pool.query(getEmail);
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.othername,
        req.body.email,
        req.body.phoneNumber,
        req.body.passportURL,
        hashPassword,
        req.body.registerAs,
        false,
      ];
      /** check if firstname is given */

      if (!req.body.firstname) {
        return res.status(412).json({
          "status": 412,
          "error" :'First name is required'
        });
      }
      /** validate first name to be letters alone */
      if(!authHelper.isValidName(req.body.firstname)){
        return res.status(406).json({
          "status":406,
          "error":"First name must contain only letters"
        })
      }
      /** validate last name to be contain letters alone */
      if(!authHelper.isValidName(req.body.lastname)){
        return res.status(406).json({
          "status":406,
          "error":"Last name must be contain only letters"
        })
      }
     /**validate other name to contain only letter alone */
      if(!authHelper.isValidName(req.body.othername)){
        return res.status(406).json({
          "status":406,
          "error":"Other name must be alphabets"
        })
      }
      if (!req.body.email) {
        return res.status(412).json({
          "status": 412,
          "error": 'Email is required'
        });
      }

    if(authHelper.isUniqueEmail(req.body.email, email) !== null){
     return res.status(422).json({
       "status":422,
       "error":'Email already exists'
     })
    }
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        "status":400,
        "error": 'Please enter a valid email address'
      });
    }
    if(!authHelper.isValidPhone(req.body.phoneNumber)){
      return res.status(406).json({
        "status":406,
        "error":"invalid format. Use +(234)  "
      })
    }
    if (!req.body.password) {
      return res.status(412).json({
        "status":412,
        "error": 'Password is required'
      });
    }

    if (!authHelper .isValidPassword(req.body.password)) {
      return res.status(400).json({
        "status":400,
        "error": 'Please enter a valid password',
        "hint": 'Password must be between 6 and 15 characters long and must contain digits and letters'
      });
    }
    if (!req.body.registerAs) {
      return res.status(412).json({
        "status":412,
        'error':'You need to register As'
      })
    }
    /** try and catch async block */
    try {
      await pool.query(createUser, values);
      const { rows } = await pool.query(loginUser, [req.body.email]);

      // generate a user token for that user id
      const token = authHelper .generateToken(rows[0].id, rows[0].isadmin)
      return res.status(201).json({
        "status": "SIGN UP SUCCESFUL",
        "data":[{
          "token": token,
          "user": rows[0]

        }]
      });
    } catch (error) {
      return res.status(302).json({
        status: 'FAILED',
        message: error.toString()
      });
    }
  }

}
export default userController