/* eslint-disable space-before-blocks */
import jwt from 'jsonwebtoken';
import pool from '../migrate';
import { redisClient } from '../migrate';
import 'dotenv';

const auth = {
  // eslint-disable-next-line consistent-return
  async checkToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1] || req.params.token;
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: 'You need to Login',
      });
    }
    const invalid = (callback) => {
      redisClient.lrange('token', 0, 100, (err, result) => callback(result));
    };
    invalid((result) => {
      if (result.indexOf(token) > -1){
        return res.status(400).json({
          status: 400,
          error: 'Invalid Token',
        });
      }

    });
    try {
      const decrypt = await jwt.verify(token, process.env.SECRET);
      const getUser = 'SELECT * FROM users WHERE id= $1';
      const { rows } = await pool.query(getUser, [decrypt.id]);
      if (!rows[0]) {
        return res.status(403).json({
          status: 403,
          error: ' Token Not accessible',
        });
      }
      req.user = {
        id: decrypt.id,
        firstname: decrypt.firstname,
        status: decrypt.registerAs,
        isAdmin: decrypt.isAdmin,
      };
      next();
    } catch (error) {
      return res.status(501).json({
        status: 501,
        error: error.toString(),
      });
    }
  },
};
export default auth;
