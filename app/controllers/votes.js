import pool from '../migrate';
import authHelper from '../helpers/auth';
import 'dotenv';
import '@babel/polyfill';

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

      if (!authHelper.isValidNumber(officeId)) {
        return res.status(406).json({
          status: 406,
          error: 'office input not valid',
        });
      }
      // get all offices voted by a particular user
      const getOffice = 'Select office from votes where createdBy = $1 AND office = $2';
      const checkOffice = await pool.query(getOffice, [user, officeId]);
      if (checkOffice.rows[0]) {
        return res.status(405).json({
          status: 405,
          error: 'You have already voted for this office',
        });
      }
      const candidateId = Number(req.body.candidate);
      if (!authHelper.isValidNumber(candidateId)) {
        return res.status(406).json({
          status: 406,
          error: 'candidate input not valid',
        });
      }
      // check that the candidates exist
      const Candidacy = 'Select * from candidates where id = $1';
      const getCandidate = await pool.query(Candidacy, [candidateId]);
      if (!getCandidate.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Not a candidate',
        });
      }


      const postVote = `INSERT INTO votes(office,candidate ,createdBy)
    VALUES($1, $2 ,$3)`;
      const values = [officeId, candidateId, user];
      await pool.query(postVote, values);
      const getVotes = await pool.query('SELECT * from votes');
      return res.status(201).json({
        status: 201,
        data: {
          office: getVotes.rows[0].office,
          candidate: getVotes.rows[0].candidate,
          voter: user,
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
