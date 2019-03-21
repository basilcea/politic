/* eslint-disable quote-props */
import pool from '../migrate';
import authHelper from '../helpers/auth';

/**
  * Represents a controller  class for all candidate specific acitvities
  * @class partyController
 */
class partyController {
  /**
  * Create an office
  * @param {string} - name of office
  * @param {string} - type of office
  * @method createParty
  * @return
  */
  static async createParty(req, res) {
    const {
      name, hqAddress, logoUrl,
    } = req.body;
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
    }
    const newName = name.trim().toLowerCase()
    const sendParty = `INSERT INTO parties (name, hqAddress, logoUrl)
    VALUES($1, $2 ,$3 )`;
    const selectParty = 'Select * from parties where name =$1';
    const values = [newName, hqAddress.trim(), logoUrl.trim()];

    try {
      /**
    * Add the party to the the database
    * create an  unique id
    * @return {object} - The party object
    */
      const AllParties = await pool.query(selectParty, [newName]);
      
      if (AllParties.rows[0]) {
        return res.status(422).json({
          'status': 422,
          'error': 'Party already exists',
        });
      }
      await pool.query(sendParty, values);
      const selectParties = 'Select * from parties'
      const newParty = await pool.query(selectParties);
      const createdParty = newParty.rows[newParty.rowCount - 1];
      return res.status(201).json({
        'status': 201,
        'data': createdParty,
      });
    } catch (err) {
      return res.status(501).json({
        'status': 501,
        'error': err.toString(),
      });
    }
  }


  /**
  * Get all parties
  * @return {object} - array of all parties
  */
  static async getAllParties(req, res) {
    try {
      const getparties = 'SELECT * from parties';
      const { rows } = await pool.query(getparties);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'parties not found',
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
  * Get a party
  * @param {integer} - id of the party
  * @return {object} - The party that has the specified id
  */

  static async getParty(req, res) {
    // force all id string to integer
    const id = Number(req.params.id);
    const partyById = 'SELECT * from parties where id =$1';
    try {
      const { rows } = await pool.query(partyById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'party not found',
        });
      }
      return res.status(200).json({
        'status': 200,
        'data': rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        'status': 500,
        'error': err.toString(),
      });
    }
  }

  /**
  * Patch a partyname
  * @param {integer} - id of the party
  * @return {object} - The party that has the specified id with new name
  */
  static async editParty(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        'status': 401,
        'error': 'Unauthorized',
      });
    }
    const id = Number(req.params.id);
    // eslint-disable-next-line prefer-destructuring
    const { name, hqAddress, logoUrl } = req.body;
    const party = 'SELECT * from parties where id=$1';
    const { rows } = await pool.query(party, [id]);
    try {
      // check if name inputted is a string
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Party not found',
        });
      }
      const updateName = `Update parties SET name = $1 , hqaddress =$2 , logourl = $3  where id = $4 returning *`;
      const values = [
        name || rows[0].name,
        hqAddress || rows[0].hqaddress,
        logoUrl || rows[0].logourl,
        id,
      ];
      const updatedParty = await pool.query(updateName, values);
      return res.status(201).json({
        'status': 201,
        'data': updatedParty.rows[0],
      });
    } catch (err) {
      return res.status(501).json({
        'status': 501,
        'error': err.toString(),
      });
    }
  }

  /**
  * Delete a party
  * @param {integer} - id of the party
  * @return {object} - The satus code and message to show delte action completed
  */
  static async deleteParty(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
    }
    const id = Number(req.params.id);
    try {
      const getParty = 'Select * from parties where id =$1';
      const { rows } = await pool.query(getParty, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Party not found',
        });
      }
      const deleting = 'Delete from parties where id=$1';
      await pool.query(deleting, [id]);
      return res.status(200).json({
        'status': 200,
        'data': {
          'message': 'party deleted succesfully',
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
export default partyController;
