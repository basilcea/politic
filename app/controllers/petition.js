/* eslint-disable quote-props */
import pool from '../migrate';
import * as validation from '../helpers/schema';

/**
  * Represents a controller  class for all candidate specific acitvities
  * @class petitionController
 */
class petitionController {
  /**
  * Create an office
  * @param {string} - name of office
  * @param {string} - type of office
  * @method createPetition
  * @return
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
    validation.check(req.body, validation.createPetitionSchema, res);
    const sendPetition = `INSERT INTO petitions (office, createdBy, subject, body ,evidence)
    VALUES($1, $2 ,$3 ,$4 ,$5 )`;
    const selectPetition = 'Select * from petitions';
    const values = [office, req.user.id, subject.trim(), body.trim(), evidence];

    try {
      /**
    * Add the petition to  the database
    * create an  unique id
    * @return {object} - The party object
      */
      await pool.query(sendPetition, values);

      const AllPetitions = await pool.query(selectPetition);

      const createdPetition = AllPetitions.rows[AllPetitions.rowCount - 1];
      return res.status(201).json({
        'status': 201,
        'data': {
          'id': createdPetition.id,
          'office': createdPetition.office,
          'createdBy': createdPetition.createdBy,
          'text': createdPetition.subject,
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
}
export default petitionController;
