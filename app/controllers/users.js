/* eslint-disable no-unused-expressions */
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
      validation.check(req.body, validation.loginSchema, res);
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

  static async editProfile(req, res) {
    const {
      firstname, lastname, othername, email, phoneNumber, registerAs, passportUrl,
    } = req.body;

    validation.check(req.body, validation.editProfileSchema, res);
    const getUser = 'SELECT * from users where id = $1';
    const { rows } = await pool.query(getUser, [req.user.id]);
    if (!rows[0]) {
      return res.status(401).json({
        'status': 401,
        'error': 'Unauthorized',
      });
    }

    try {
      const updateUser = `UPDATE users
      SET firstname =$1, lastname =$2, othername =$3, email=$4, phonenumber=$5, registeras=$6, passporturl=$7 ,isAdmin=$8
      WHERE id = $9 returning *`;

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
      if (req.user.isAdmin === true && registerAs === 'politician') {
        const response = await pool.query(updateUser,
          [
            firstname || rows[0].firstname, lastname || rows[0].lastname,
            othername || rows[0].othername, email || rows[0].email,
            phoneNumber || rows[0].phonenumber, registerAs || rows[0].registeras,
            passportUrl || rows[0].passporturl, false, req.user.id,
          ]);
        res.status(200).json({
          'status': 200,
          'data': {
            '': response.rows,
            'message': 'You are no longer an admin as admin cannot be a politician',
          },
        });
      }

      const getInterest = 'Select interest from interests where interest=$1';
      const interest = await pool.query(getInterest, [req.user.id]);

      if (registerAs === 'voter' && interest.rows[0] !== undefined) {
        const deleteInterest = 'Delete from interests where interest =$1';
        await pool.query(deleteInterest, [req.user.id]);
        const newResponse = await pool.query(updateUser,
          [
            firstname || rows[0].firstname, lastname || rows[0].lastname,
            othername || rows[0].othername, email || rows[0].email,
            phoneNumber || rows[0].phonenumber, registerAs || rows[0].registeras,
            passportUrl || rows[0].passporturl, rows[0].isAdmin, req.user.id,
          ]);
        res.status(200).json({
          'status': 200,
          'data': {
            '': newResponse.rows,
            'message': 'All political interest removed',
          },
        });
      }
      const getCandidate = 'Select candidate from candidates where candidate=$1';
      const candidate = await pool.query(getCandidate, [req.user.id]);
      if (candidate.rows[0] !== undefined) {
        const anotherResponse = await pool.query(updateUser,
          [
            firstname || rows[0].firstname, lastname || rows[0].lastname,
            othername || rows[0].othername, email || rows[0].email,
            phoneNumber || rows[0].phonenumber, 'politician',
            passportUrl || rows[0].passporturl, rows[0].isAdmin,
            req.user.id,
          ]);
        res.status(401), json({
          'status': 401,
          'data': {
            '': anotherResponse.rows,
            'message': 'You are already a candidate. You cannot be a voter',
          },
        });
      }
      const expectedResponse = await pool.query(updateUser,
        [
          firstname || rows[0].firstname,
          lastname || rows[0].lastname,
          othername || rows[0].othername,
          email || rows[0].email,
          phoneNumber || rows[0].phonenumber,
          registerAs || rows[0].registeras,
          passportUrl || rows[0].passporturl,
          rows[0].isAdmin,
          req.user.id,
        ]);
      console.log(expectedResponse);
      return res.status(200).json({
        'status': 200,
        'data': expectedResponse.rows,
      });
    } catch (error) {
      res.status(500).json({
        'status': 500,
        'error': error.toString(),
      });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      validation.check(req.body, validation.changePasswordSchema, res);
      const Password = 'Select password from users where id= $1';
      const getPassword = await pool.query(Password, [req.user.id]);
      
      if (authHelper.comparePassword(getPassword.rows[0].password, oldPassword) === false) {
        return res.status(422).json({
          'status': 422,
          'error': 'Incorrect Password',
        });
      }
      const hashedPassword = authHelper.hashPassword(newPassword);
      const NewPassword = 'UPDATE users SET password = $1 where id=$2 returning password';
      const insertNewPassword = await pool.query(NewPassword, [hashedPassword, req.user.id]);
      return res.status(200).json({
        'status': 200,
        'data': insertNewPassword.rows,
      });
    }
    catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }
  }

  static async deleteProfile(req , res) {
    
    try {
      const getUser = 'Select * from users where id= $1';
   
      const checkUser = await pool.query(getUser ,[req.user.id])
      if(!checkUser.rows[0]) {
        return res.status(404).json({
          'status':404,
          'error': 'User not found'
        })
      }
      const deleting = 'Delete from users where id= $1';
      await pool.query(deleting ,[req.user.id])
      return res.status(200).json({
        'status': 200,
        'data': {
          'message': 'Your profile has been deleted'
        }
      })
    }catch(err) {
      return res.status(500).json({
        'status':500,
        'error': err.toString()
      })
    }   
  }

}

export default userController;
