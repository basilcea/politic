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

  static async getOfficeResults(req, res) {
    const officeId = Number(req.params.id);
    // check if input string is valid.
    const selectResult = `SELECT office, candidate , count(candidate) result  from votes
    where office = $1  Group BY (candidate ,office) `;
    try {
      const getResult = await pool.query(selectResult, [officeId]);
      if (!getResult.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Office not found',
        });
      }
      return res.status(200).json({
        'status': 200,
        'data': getResult.rows,
      });
    } catch (err) {
      return res.status(501).json({
        'status': 501,
        'error': err.toString(),
      });
    }
  }

  static async votingActivites(req, res) {
    const selectVotes = 'Select * from votes where createdBy = $1';
    try {
      const getVoting = await pool.query(selectVotes, [req.user.id]);
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
export default votesController;
