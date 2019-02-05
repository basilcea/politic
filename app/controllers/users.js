import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"
class userController {
  /*---------------- User methods ---------------------------*/

  // create User
  static async signup( req, res ) {
    const createUser = `INSERT INTO users(firstname, lastname, othername, email,phoneNumber, passportURL,
    password,registerAs,isAdmin, isCandidate)
    VALUES($1, $2, $3,$4, $5, $6 ,$7, $8, $9, $10)`;
    const loginUser = `SELECT * FROM users WHERE email = $1`;
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
        false,
      ];

    // check if email and password is inputted
    if (!req.body.firstname) {
      return res.status(412).json({
        "status": 412,
        "error" :'First name is required'
      });
    }
    if(!authHelper.isValidName(req.body.firstname)){
      return res.status(406).json({
        "status":406,
        "error":"First name must be alphabets"
      })
    }
    if(!authHelper.isValidName(req.body.lastname)){
      return res.status(406).json({
        "status":406,
        "error":"Last name must be alphabets"
      })
    }
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

    if(authHelper .isUniqueEmail(req.body.email,email.rows[0]) !== null){
     return res.status(422).json({
       "status":422,
       "error":'Email already exists'
     })
    }
    if (!authHelper .isValidEmail(req.body.email)) {
      return res.status(400).json({
        "status":400,
        "error": 'Please enter a valid email address'
      });
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
    // hash the password inputted

    // insert user details into the database
    try {

      await pool.query(createUser, values);

      const { rows } = await pool.query(loginUser, [req.body.email]);

      // generate a user token for that user id
      const token = authHelper .generateToken(rows[0].userid, rows[0].isadmin, rows[0].username)
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