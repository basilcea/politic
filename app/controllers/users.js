import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"
/**
  * Represents a controller  class for all user specific acitvities
  * @class userController
 */

class userController {
  /*---------------- User methods ---------------------------*/

  /**
    * Create  a user
    * @async requestPromises
    * @method signup
    * @params {object} request - The form data to be inputted
    * @return {object} response - The status code and data.
    *
   */
  static async signup( req, res ) {

    // Sql query for inserting into user table
    const createUser = `INSERT INTO users(firstname, lastname, othername, email,phoneNumber, passportURL, password,registerAs,isAdmin)
    VALUES($1, $2, $3,$4, $5, $6 ,$7, $8, $9)`;

    // Sql query for  login users
    const loginUser = `SELECT * FROM users WHERE email = $1`;

    // hashpassword from helper class
    const getUser =`SELECT firstname from users`;
    const users= await pool.query(getUser);
    const getEmail=`SELECT email from users`;
    const email= await pool.query(getEmail);
    const getphone=`SELECT phoneNumber from users`;
    const phone = await pool.query(getphone);
    const hashPassword = authHelper.hashPassword(req.body.password.trim())
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.othername,
        req.body.email,
        req.body.phoneNumber,
        req.body.passportURL,
        hashPassword,
        req.body.registerAs,
        req.body.isAdmin,
      ];
      /** check if firstname is given */

      if (!req.body.firstname) {
        return res.status(412).json({
          "status": 412,
          "error" :'First name is required'
        });
      }
      /** validate first name to be letters alone */
      if(!authHelper.isValidName(req.body.firstname.trim())){
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
      if (!req.body.email.trim()) {
        return res.status(412).json({
          "status": 412,
          "error": 'Email is required'
        });
      }

    if(authHelper.isUniqueEmail(req.body.email.trim(), email) !== null){
     return res.status(409).json({
       "status":409,
       "error":'Email already exists'
     })
    }
    if (!authHelper.isValidEmail(req.body.email.trim())) {
      return res.status(406).json({
        "status":406,
        "error": 'Please enter a valid email address'
      });
    }
    if (!req.body.phoneNumber.trim()) {
      return res.status(412).json({
        "status": 412,
        "error" :'Phone Number is required'
      });
    }
    if(!authHelper.isValidPhone(req.body.phoneNumber.trim())){
      return res.status(406).json({
        "status":406,
        "error":"invalid format.Must be 11 digits. Start with 0"
      })
    }
     if(authHelper.isUniquePhone(req.body.phoneNumber.trim(), phone)!==null){

     return res.status(409).json({
       "status":409,
       "error":'Phone number already exists'
     })
    }
    if(/^.*\.(jpg|JPG|PNG|png)$/.test(req.body.passportUrl.trim()) ===false){
      return res.status(406).json({
      "status": 406,
      "error": "Only .JPG or .PNG Accepted"
      })
    }
    if (!req.body.password.trim()) {
      return res.status(412).json({
        "status":412,
        "error": 'Password is required'
      });
    }
    if (!authHelper .isValidPassword(req.body.password.trim())) {
      return res.status(406).json({
        "status":406,
        "error": 'Please enter a valid password',
        "hint": 'Password must be between 6 and 15 characters long and must contain digits and letters'
      });
    }
    if (!req.body.registerAs) {
      return res.status(412).json({
        "status":412,
        'error':'Register as field is required'
      })
    }
    req.body.isAdmin.trim()

    /** try and catch async block */
    try {
      await pool.query(createUser, values);
      const { rows } = await pool.query(loginUser, [req.body.email.trim()]);

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
  /**
    * Login  a user
    * @async requestPromises
    * @method login
    * @params {object} request - The form data to be inputted
    * @return {object} response - The status code and data including login token.
    *
   */
  static async login( req, res ) {
  // login user similar to get user

    if (!req.body.email) {
      return res.status(412).json({
        "status" : 412,
        'error': 'Email is required'});
    }
    if (!req.body.password) {
      return res.status(412).json({
        "status": 412,
        'error': 'Password is required'});
    }
    // check if the email is valid
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(406).json({
        "status": 406,
        'error': 'Please enter a valid email address' });
    }
    const getUser = 'SELECT * FROM users WHERE email = $1';
    try {
      //
      const { rows } = await pool.query(getUser, [req.body.email]);
      if (!rows[0]) {
        return res.status(404).json({
          "status": 404,
          'error': 'Email does not exist'});
      }
      // check if the inputted password is the same password created
      if(!authHelper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          "status": 400,
          "error" : 'Incorrect password' });
      }
      // generate a token for the user
      const token = authHelper.generateToken(rows[0].id, rows[0].isadmin);
      // check if token
      return res.status(200).json({
        "status":200,
        "data":[{
          "token":token,
          "user":rows[0]
        }],
      });
    } catch(error) {
      return res.status(501).json({
        "status": 501,
        "error": error.toString()
      })
    }
  }
}
export default userController