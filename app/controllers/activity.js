import pool from '../migrate';
import { redisClient } from '../migrate';
import authHelper from '../helpers/auth';
import 'dotenv';
import '@babel/polyfill';

class userActivityController {
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
    const {
      firstname, lastname, othername, email, phoneNumber, registerAs, passportUrl,
    } = req.body;
    const token = req.headers.authorization;
    const getUser = 'SELECT * from users where id = $1';
    const { rows } = await pool.query(getUser, [req.user.id]);
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
      if (authHelper.isUniqueEmail(email, emailing) !== null) {
        return res.status(422).json({
          status: 422,
          error: 'Email already exists',
        });
      }

      if (authHelper.isUniquePhone(phoneNumber, emailing) !== null) {
        return res.status(422).json({
          status: 422,
          error: 'phoneNumber already exists',
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
        redisClient.LPUSH('token', token);
        authHelper.generateToken(response.rows[0].id, false);
        res.status(200).json({
          status: 200,
          data: {
            '': response.rows,
            message: 'You are no longer an admin as admin cannot be a politician',
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
          status: 200,
          data: {
            '': newResponse.rows,
            message: 'All political interest removed',
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
          status: 401,
          data: {
            '': anotherResponse.rows,
            message: 'You are already a candidate. You cannot be a voter',
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
      return res.status(200).json({
        status: 200,
        data: expectedResponse.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const Password = 'Select password from users where id= $1';
      const getPassword = await pool.query(Password, [req.user.id]);

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

  static async deleteProfile(req, res) {
    try {
      const getUser = 'Select * from users where id= $1';
      const checkUser = await pool.query(getUser, [req.user.id]);
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
          '': response.rows[0],
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

}
export default userActivityController;
