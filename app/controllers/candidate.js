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
      if (req.user.isAdmin !== true) {
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
      const office = await pool.query(checkOffice, [officeId]);
      if (!office.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'office not found',
        });
      }
      const candidate = await pool.query(checkCandidate, [candidateId]);
      if (candidate.rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Candidate already exists',
        });
      }

      await pool.query(insertCandidate, [officeId, candidateId, partyId]);
      const inserted = await pool.query('SELECT * from candidates');
      return res.status(201).json({
        'status': 201,
        'data': inserted.rows[inserted.rowCount - 1],
      });
    } catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }
  }

  static async searchCandidate(req, res) {
    const id = Number(req.params.id);
    try {
      const candidate = 'Select * from candidates where office= $1';
      const AllUsers = 'Select id , firstname , lastname, othername, passporturl from users where id =$1';
      const parties = 'Select *  from parties where id = $1';
      const { rows } = await pool.query(candidate, [id]);
      if (!rows) {
        return res.status(404).json({
          'status': 404,
          'error': 'No candidate found for this office',
        });
      }
      const data = [];
      for (let i = 0; i < rows.length; i++) {
        const getusers = await pool.query(AllUsers, [rows[i].candidate]);
        const getparty = await pool.query(parties, [rows[i].party]);
        data.push({
          office: id,
          user: getusers.rows[0].id,
          username: `${getusers.rows[0].firstname} ${getusers.rows[0].lastname} ${getusers.rows[0].othername}`,
          passport: getusers.rows[0].passporturl,
          party: getparty.rows[0].id,
          partyname: getparty.rows[0].name,
          logo: getparty.rows[0].logourl,
        });
      }
      return res.status(200).json({
        'status': 200,
        data,
      });

    } catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }

  }

  static async getCandidatebyId(req, res) {
    const candidateId = Number(req.params.id);
    try {
      const candidate = 'Select * from candidates where id = $1';
      const { rows } = await pool.query(candidate, [candidateId]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'No candidate found',
        });
      }
      return res.status(200).json({
        'status': 200,
        'data': rows,
      });

    } catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }

  }

  static async getCandidate(req, res) {
    const candidateId = Number(req.params.candidate);
    try {
      const candidate = 'Select * from candidates where candidate = $1';
      const { rows } = await pool.query(candidate, [candidateId]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'No candidate found',
        });
      }
      return res.status(200).json({
        'status': 200,
        'data': rows,
      });

    } catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }

  }

  static async editCandidate(req, res) {
    try {
      const id = Number(req.params.id);
      if (req.user.isAdmin !== true) {
        return res.status(401).json({
          'status': 401,
          'error': 'Unauthorized',
        });
      }
      const getCandidates = 'Select * from candidates where id =$1';
      const { rows } = await pool.query(getCandidates, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Candidate not found',
        });
      }
      const {
        office, party,
      } = req.body;

      const updateCandidate = 'Update candidates SET office = $1 , party =$2  where id = $3 returning *';
      const values = [
        office || rows[0].office,
        party || rows[0].party,
        id];
      const updatedCandidate = await pool.query(updateCandidate, values);
      return res.status(201).json({
        'status': 201,
        'data': updatedCandidate.rows[0],
      });

    } catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }
  }

  static async deleteCandidate(req, res) {
    const id = Number(req.params.id);
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        'status': 401,
        'error': 'Unauthorized',
      });
    }
    const getInterests = 'Select * from candidates where id =$1 ';
    const { rows } = await pool.query(getInterests, [id]);
    if (!rows[0]) {
      return res.status(404).json({
        'status': 404,
        'error': 'Candidate not found',
      });
    }
    const deleting = 'Delete from candidates where id=$1';
    try {
      await pool.query(deleting, [id]);
      return res.status(200).json({
        'status': 200,
        'data': {
          'message': 'Candidate deleted succesfully',
        },
      });
    } catch (err) {
      return res.status(501).json({
        'status': 501,
        'error': err.toString(),
      });
    }
  }
}
export default candidateController;
