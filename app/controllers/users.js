/* eslint-disable quote-props */
import pool from '../migrate';
import authHelper from '../helpers/auth';
import 'dotenv';
import '@babel/polyfill';
import * as validation from '../helpers/schema';
/**
  * Represents a controller  class for all user specific acitvities
  * @class userController
 */


class userController {
  /* ---------------- User methods ---------------------------*/

  /**
    * Create  a user
    * @async requestPromises
    * @method signup
    * @params {object} request - The form data to be inputted
    * @return {object} response - The status code and data.
    *
   */
  static async signup(req, res) {
    const {
      firstname, lastname, othername, password, email, phoneNumber, registerAs, isAdmin,
    } = req.body;
    validation.check(req.body, validation.signupSchema, res);
    /** try and catch async block */
    try {
      const getEmail = 'SELECT email, phonenumber from users';
      const emailing = await pool.query(getEmail);
      if (authHelper.isUniqueEmail(email, emailing) !== null) {
        return res.status(422).json({
          'status': 422,
          'error': 'Email already exists',
        });
      }
      if (authHelper.isUniquePhone(phoneNumber, emailing) !== null) {
        return res.status(422).json({
          'status': 422,
          'error': 'phoneNumber already exists',
        });
      }
      const hashPassword = authHelper.hashPassword(password);

      const createUser = `INSERT INTO users(firstname, lastname, othername, email,phoneNumber, password,registerAs ,isAdmin)
      
      VALUES($1, $2, $3,$4, $5, $6 ,$7 ,$8)`;
      const values = [
        firstname.trim(), lastname, othername, email, phoneNumber, hashPassword, registerAs.trim(), isAdmin,
      ];
      await pool.query(createUser, values);

      const loginUser = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(loginUser, [req.body.email]);

      // generate a user token for that user id
      const token = authHelper.generateToken(rows[0].id, rows[0].isadmin);
      return res.status(201).json({
        'status': 201,
        'data': [{
          'token': token,
          'user': rows[0],
        }],
      });
    } catch (error) {
      res.status(500).json({
        'status': 500,
        'error': error.toString(),
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
  static async login(req, res) {
  // login user similar to get user

    const getUser = 'SELECT * FROM users WHERE email = $1';
    try {
      //
      validation.check(req.body, validation.loginSchema,res);
      const { email, password } = req.body;
      const { rows } = await pool.query(getUser, [email]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Email does not exist',
        });
      }
      // check if the inputted password is the same password created
      if (!authHelper.comparePassword(rows[0].password, password)) {
        return res.status(400).json({
          'status': 400,
          'error': 'Incorrect password',
        });
      }
      // generate a token for the user
      const token = authHelper.generateToken(rows[0].id, rows[0].isadmin);
      // check if token
      return res.status(200).json({
        'status': 200,
        'data': [{
          'token': token,
          'user': rows[0],
        }],
      });
    } catch (error) {
      return res.status(501).json({
        'status': 501,
        'error': error.toString(),
      });
    }
  }
}
export default userController;
