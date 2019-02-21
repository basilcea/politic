/* eslint-disable quote-props */
import pool from '../migrate';
import 'dotenv';
import '@babel/polyfill';
import * as validation from '../helpers/schema';

/**
  * Represents a controller  class for all candidate specific acitvities
  * @class candidateController
 */

class votesController {
/**
    * Create  a vote
    * @async requestPromises
    * @method vote
    * @return {object} response - The status code and data.
    *
   */
  static async vote(req, res) {
    const user = req.user.id;
    try {
      const officeId = Number(req.body.office);

      validation.check(officeId, validation.id, res);
      // get all offices voted by a particular user
      const getOffice = 'Select office from votes where createdBy = $1 AND office = $2';
      const checkOffice = await pool.query(getOffice, [user, officeId]);
      if (checkOffice.rows[0]) {
        return res.status(400).json({
          'status': 400,
          'error': 'You have already voted for this office',
        });
      }
      const candidateId = Number(req.body.candidate);
      validation.check(officeId, validation.id, res);
      // check that the candidates exist
      const Candidacy = 'Select * from candidates where id = $1';
      const getCandidate = await pool.query(Candidacy, [candidateId]);
      if (!getCandidate.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Not a candidate',
        });
      }


      const postVote = `INSERT INTO votes(office,candidate ,createdBy)
    VALUES($1, $2 ,$3)`;
      const values = [officeId, candidateId, user];
      await pool.query(postVote, values);
      const getVotes = await pool.query('SELECT * from votes');
      return res.status(201).json({
        'status': 201,
        'data': {
          'office': getVotes.rows[0].office,
          'candidate': getVotes.rows[0].candidate,
          'voter': user,
        },
      });
    } catch (err) {
      return res.status(501).json({
        status: 501,
        error: err.toString(),
      });
    }
  }
}
export default votesController;
