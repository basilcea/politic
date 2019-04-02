import pool from '../migrate';
import { redisClient } from '../migrate';
import authHelper from '../helpers/auth';


/**
  * Represents a controller class for all user specific acitvities
  * @class userActivityController
 */
class userActivityController {

  /**
  * Get the user profile
  * Returns the status code and the information
  * @async
  * @method getProfile
  * @param {number} id - The ID of the user as request parameter
  * @returns {Promise <object>} status code and data or error message
  */

  static async getProfile(req, res) {
    const getUser = 'SELECT * from users where id =$1';
    const { rows } = await pool.query(getUser, [req.user.id]);
    try {
      return res.status(200).json({
        status: 200,
        data: rows[0],

      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  }

  static async editProfile(req, res) {
  /**
  * Edit the user profile
  * Returns the status code and previous or edited information or error message
  * @async
  * @method editProfile
  * @param {string} id - The ID of the user as request parameter
  * @param {object} response - The input of user
  * @returns {Promise <object>} status code and data or error message
  */
    const {
      firstname, lastname, othername, email, phoneNumber, registerAs, passportUrl,
    } = req.body;
    const token = req.headers.authorization;
    const getUser = 'SELECT * from users where id = $1';
    const { rows } = await pool.query(getUser, [req.user.id]);

    /* check if user owns the profile */
    if (!rows[0]) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
    }

    try {
      const updateUser = `UPDATE users
          SET firstname =$1, lastname =$2, othername =$3, email=$4, phonenumber=$5, registeras=$6, passporturl=$7 ,isAdmin=$8
          WHERE id = $9 returning *`;

      const getEmail = 'SELECT email, phonenumber from users';
      const emailing = await pool.query(getEmail);
      let response;

        /* Check if an admin wants to express an interest */
      if (req.user.isAdmin === true && registerAs === 'politician') {
         response = await pool.query(updateUser, [
          firstname || rows[0].firstname, lastname || rows[0].lastname,
          othername || rows[0].othername, email || rows[0].email,
          phoneNumber || rows[0].phonenumber,
          registerAs || rows[0].registeras,
          passportUrl || rows[0].passporturl, false, req.user.id,
        ]);
        // Remove user from being an admin
        redisClient.LPUSH('token', token);
        authHelper.generateToken(response.rows[0].id, false);
        res.status(200).json({
          status: 200,
          data: {
            info: response.rows,
            message: 'You are no longer an admin as admin cannot be a politician',
          },
        });
      }

      const getInterest = 'Select interest from interests where interest=$1';
      const interest = await pool.query(getInterest, [req.user.id]);

      /* check if user changes status from politician to voter */
      if (registerAs === 'voter' && interest.rows[0] !== undefined) {
        const deleteInterest = 'Delete from interests where interest =$1';
        await pool.query(deleteInterest, [req.user.id]);
        response = await pool.query(updateUser,
          [
            firstname || rows[0].firstname, lastname || rows[0].lastname,
            othername || rows[0].othername, email || rows[0].email,
            phoneNumber || rows[0].phonenumber, registerAs || rows[0].registeras,
            passportUrl || rows[0].passporturl, rows[0].isAdmin, req.user.id,
          ]);
          // Remove all political interest for user
        res.status(200).json({
          status: 200,
          data: {
            info: response.rows,
            message: 'All political interest removed',
          },
        });
      }
      const getCandidate = 'Select candidate from candidates where candidate=$1';
      const candidate = await pool.query(getCandidate, [req.user.id]);
      /* check if user is already a candidate */
      if (candidate.rows[0] !== undefined) {
        response = await pool.query(updateUser,
          [
            firstname || rows[0].firstname, lastname || rows[0].lastname,
            othername || rows[0].othername, email || rows[0].email,
            phoneNumber || rows[0].phonenumber, 'politician',
            passportUrl || rows[0].passporturl, rows[0].isAdmin,
            req.user.id,
          ]);

        // prevent user from changing status to voter
        res.status(401), json({
          status: 401,
          data: {
            info: response.rows,
            message: 'You are already a candidate. You cannot be a voter',
          },
        });
      }
      response = await pool.query(updateUser,
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
      return res.status(200).json({
        status: 200,
        data: response.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  }

   /**
  * Change the user password on login
  * Returns the hash of the new password
  * @async
  * @method changePassword
  * @param {number} id - The Id of the user as request parameter
  * @typedef {object} - User
  * @property {string}  old password - old password
  * @property {string}  new password - new password
  * @property {string} confirm password - new password
  * @returns {Promise <object>} status code and data or error message
  */
  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const Password = 'Select password from users where id= $1';
      const getPassword = await pool.query(Password, [req.user.id]);

      // check if the old password is correct.

      if (authHelper.comparePassword(getPassword.rows[0].password, oldPassword) === false) {
        return res.status(422).json({
          status: 422,
          error: 'Incorrect Password',
        });
      }
      const hashedPassword = authHelper.hashPassword(newPassword);
      const NewPassword = 'UPDATE users SET password = $1 where id=$2 returning password';
      const insertNewPassword = await pool.query(NewPassword, [hashedPassword, req.user.id]);
      return res.status(200).json({
        status: 200,
        data: insertNewPassword.rows,
      });
    }
    catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.toString(),
      });
    }
  }
  /**
  * Delete the user profile
  * Returns the status code and success or error message
  * @async
  * @method deleteProfile
  * @param {string} id - The ID of the user as request parameter
  * @returns {Promise <object>} status code and data or error message
  */
  static async deleteProfile(req, res) {
    try {
      const getUser = 'Select * from users where id= $1';
      const checkUser = await pool.query(getUser, [req.user.id]);

      // check if the user to be deleted exists
      // user can only delete his own profile

      if (!checkUser.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }
      const deleting = 'Delete from users where id= $1';
      await pool.query(deleting, [req.user.id]);
      return res.status(200).json({
        status: 200,
        data: {
          message: 'Your profile has been deleted',
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.toString(),
      });
    }
  }
  /**
  * Admin can make another user admin
  * Returns the status code, user info and admintoken
  * @async
  * @method makeAdmin
  * @param {string} id - The ID of the user as request parameter
  * @returns {Promise <object>} status code and data or error message
  */
  static async makeAdmin(req, res) {
    const id = Number(req.params.id);
    const updateUser = 'UPDATE users SET isAdmin =$1,registerAs=$2 WHERE id = $3  returning id,firstname,registerAs ,isAdmin';
    try {
      const user = 'select * from users where id =$1';
      if (req.user.isAdmin !== true) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }
      const { rows } = await pool.query(user, [id]);

      // check if user exists
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: ' User not found',
        });
      }
      const response = await pool.query(updateUser, [true, 'voter', id]);
      const admintoken = authHelper.generateToken(id, true);
      return res.status(200).json({
        status: 200,
        data: {
          info: response.rows[0],
          token: admintoken,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  }

   /**
  * Get all votes by a user
  * @async
  * @method votingActivities
  * @params {Number} Id - The ID of the user as request parameter
  * @return {object} response - The status code and data.
  *
  */
  static async votingActivites(req, res) {
    const selectVotes = 'Select * from votes where createdBy = $1';
    try {
      const getVoting = await pool.query(selectVotes, [req.user.id]);
      // check if user voted
      if (!getVoting.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'No activity found',
        });
      }
      return res.status(200).json({
        'status': 200,
        'data': getVoting.rows,
      });
    }
    catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }
  }

}
export default userActivityController;
