/* eslint-disable quote-props */
/* eslint-disable max-len */
import pool from '../migrate';
import 'dotenv';
import '@babel/polyfill';
import * as validation from '../helpers/schema';

/**
  * Represents a controller  class for all candidate specific acitvities
  * @class candidateController
 */

class candidateController {
  /**
    * Create  a candidate
    * @async requestPromises
    * @method makeCandidate
    * @params {object} id - The user id to be inputted
    * @return {object} response - The 'status' code and data to be outputted if input passes validation
    * @return {object} response - The 'status' code and 'error' message to be outputted fails validation.
    *
   */

  static async makeCandidate(req, res) {
    // check if candidates exists
    const checkInterest = 'SELECT * from interests where interest = $1';
    const checkCandidate = 'SELECT * from candidates where id = $1';
    const checkOffice = 'SELECT * from offices where id= $1';
    const checkUser = 'SELECT * from users where id = $1';
    const insertCandidate = `Insert into candidates (office , candidate ,party)
  Values($1,$2 ,$3)`;
    try {
    // check if user is admin
      if (req.user.isAdmin === false) {
        return res.status(401).json({
          'status': 401,
          'error': 'Unauthorized',
        });
      }
      // force all number string to integer
      const userId = Number(req.params.id);
      const officeId = Number(req.body.office);
      const candidateId = Number(req.body.user);
      const partyId = Number(req.body.party);

      validation.check(userId, validation.id, res);
      // check if  user exists
      const { rows } = await pool.query(checkUser, [userId]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'User not found',
        });
      }
      // check if the user has expressed interest
      const politician = await pool.query(checkInterest, [userId]);
      if (!politician.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'User has not expressed interest',
        });
      }
      // check if office exist
      validation.check(officeId, validation.id, res);
      const office = await pool.query(checkOffice, [officeId]);
      if (!office.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'office not found',
        });
      }
      validation.check(candidateId, validation.id, res);
      const candidate = await pool.query(checkCandidate, [candidateId]);
      if (candidate.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Candidate already exists',
        });
      }

      validation.check(partyId, validation.id, res);
      await pool.query(insertCandidate, [officeId, candidateId, partyId]);
      const inserted = await pool.query('SELECT * from candidates');
      return res.status(201).json({
        'status': 201,
        'data': inserted.rows[inserted.rowCount - 1]
      });
    } catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }
  }
}
export default candidateController;
