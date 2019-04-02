/* eslint-disable quotes */
/* eslint-disable prefer-template */
/* eslint-disable quote-props */
import pool from '../migrate';
import * as validation from '../helpers/schema';

/**
  * Represents a controller  class for all petition specific acitvities
  * @class petitionController
 */
class petitionController {
  /**
  * Create a petition
  * @param {Number} ID - ID of office
  * @typedef {object} Petition - The input of the petition
  * @property {string} subject - Subject of petition
  * @property {string} subject - body of petition
  * @property {array} evidences - pictorial evidences of petition
  * @method createPetition
  * @returns {object} response - The petition along with evidences
  */
  static async createPetition(req, res) {
    const {
      office, subject, body, evidence,
    } = req.body;
    const getUser = 'Select * from users where id= $1 AND registeras =$2';
    const checkPolitician = await pool.query(getUser, [req.user.id, 'politician']);
    if (!checkPolitician.rows[0]) {
      return res.status(404).json({
        'status': 404,
        'error': 'User is not a politician',
      });
    }
    const sendPetition = `INSERT INTO petitions (office, createdBy, subject, body ,evidence)
    VALUES($1, $2 ,$3 ,$4 ,$5 )`;
    const selectPetition = 'Select * from petitions';
    const values = [office, req.user.id, subject.trim(), body.trim(), [evidence]];

    try {
      await pool.query(sendPetition, values);

      const AllPetitions = await pool.query(selectPetition);

      const createdPetition = AllPetitions.rows[AllPetitions.rowCount - 1];
      return res.status(201).json({
        'status': 201,
        'data': {
          'id': createdPetition.id,
          'office': createdPetition.office,
          'createdBy': createdPetition.createdBy,
          'text': `${createdPetition.subject}\n${createdPetition.body}`,
          'evidence': createdPetition.evidence,

        },
      });
    } catch (err) {
      return res.status(501).json({
        'status': 501,
        'error': err.toString(),
      });
    }
  }


  /**
  * Edit Petition info
  * @async
  * @method editPetition
  * @params {number} Id - The ID of the petition as a request parameter.
  * @params {object} formData - The input data
  * @returns {object} response - The status code and data to be outputted
  * @returns {object} response - The status code and error message to be outputted if error.
  *
  */

  static async editPetition(req, res) {
    const getUserPetition = 'Select * from petitions where createdBy=$1 AND id=$2';
    const id = Number(req.params.id);
    // eslint-disable-next-line prefer-destructuring
    const { rows } = await pool.query(getUserPetition, [req.user.id, id]);
    if (!rows[0]) {
      return res.status(404).json({
        'status': 404,
        'Error': 'No Petition found',
      });
    }
    const {
      office, subject, body, evidence,
    } = req.body;
    let evidenceInput;
    if (evidence === '' || evidence === undefined) {
      evidenceInput = rows[0].evidence;
    }
    else {
      evidenceInput = [evidence].concat(rows[0].evidence);
    }

    const updatePetition = `Update petitions
    SET office = $1 , subject =$2 , body =$3 , evidence =$4 where id = $5 returning *`;
    const values = [
      office || rows[0].office,
      subject.trim() || rows[0].subject,
      body.trim() || rows[0].body,
      evidenceInput,
      id];
    try {
      const updatedPetition = await pool.query(updatePetition, values);
      return res.status(201).json({
        'status': 201,
        'data': {
          'id': updatedPetition.rows[0].id,
          'office': updatedPetition.rows[0].office,
          'createdBy': updatedPetition.rows[0].createdBy,
          'text': updatedPetition.rows[0].subject + "\n " + updatedPetition.rows[0].body,
          'evidence': updatedPetition.rows[0].evidence,
        },
      });
    } catch (err) {
      return res.status(501).json({
        'status': 501,
        'error': err.toString(),
      });
    }
  }

  /**
  * Get all users Petition info
  * @async
  * @method getUserPetition
  * @returns {object} response - The status code and data containing all petitions to be outputted
  * @returns {object} response - The status code and error message to be outputted if error.
  *
  */
  static async getUserPetition(req, res) {
    try {
      const getallpetitions = 'SELECT * from petitions';

      const getuserpetitions = 'SELECT * from petitions where createdBy =$1';
        // get all users petitions if user is an admin
      if (req.user.isAdmin === true) {
        const { rows } = await pool.query(getallpetitions);
        return res.status(200).json({
          'status': 200,
          'data': rows,
        });
      }
      // get all petition for a single user if user is not an admin
      const { rows } = await pool.query(getuserpetitions, [req.user.id]);
      if (!rows[0]) {
        return res.status(401).json({
          'status': 401,
          'error': 'Unauthorized',
        });
      }
      return res.status(200).json({
        'status': 200,
        'data': rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.toString(),
      });
    }
  }

  /**
  * Get a user Petition info
  * @async
  * @method getAPetition
  * @params {number} ID - The ID of the petition
  * @returns {object} response - The status code and data containing all petitions to be outputted
  * @returns {object} response - The status code and error message to be outputted if error.
  *
  */
  static async getAPetition(req, res) {
    try {
      const id = Number(req.params.id);
      const petition = 'Select * from petitions where id =$1';
      const { rows } = await pool.query(petition, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': ' Petition not Found',
        });
      }
      if (req.user.isAdmin === true) {
        return res.status(200).json({
          'status': 200,
          'data': rows[0],
        });
      }

      const getpetitions = 'SELECT * from petitions where createdBy =$1 AND id= $2';
      const userPetition = await pool.query(getpetitions, [req.user.id, id]);
      if (!userPetition.rows[0]) {
        return res.status(401).json({
          'status': 401,
          'error': 'Unauthorized',
        });
      }
      return res.status(200).json({
        'status': 200,
        'data': userPetition.rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.toString(),
      });
    }
  }

  /**
  * Delete a petition
  * @param {integer} - id of the petition
  * @return {object} - The status code and message to show delete action completed
  */
  static async deletePetition(req, res) {
    const id = Number(req.params.id);
    const getPetition = 'Select * from petitions where id =$1';
    const { rows } = await pool.query(getPetition, [id]);
    if (!rows[0]) {
      return res.status(404).json({
        'status': 404,
        'error': 'Petition not found',
      });
    }
    const deleting = 'Delete from petitions where id=$1';
    if (req.user.isAdmin === true) {
      await pool.query(deleting, [id]);
      return res.status(200).json({
        'status': 200,
        'data': {
          'message': 'petition deleted succesfully',
        },
      });
    }

    const getpetitions = 'SELECT * from petitions where createdBy =$1';
    const checkPetition = await pool.query(getpetitions, [req.user.id]);
    if (!checkPetition.rows[0]) {
      return res.status(401).json({
        'status': 401,
        'error': 'Unauthorized',
      });
    }

    try {
      await pool.query(deleting, [id]);
      return res.status(200).json({
        'status': 200,
        'data': {
          'message': 'petition deleted succesfully',
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
export default petitionController;
