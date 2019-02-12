import pool from '../migrate';
import authHelper from '../helpers/auth';
import 'dotenv';
import '@babel/polyfill';


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
    const sendParty = `INSERT INTO parties (name, AKA ,hqAddress, logoUrl)
    VALUES($1,$2 ,$3 ,$4)`;
    const selectParty = 'Select * from parties';
    const values = [req.body.name, req.body.AKA, req.body.hqAddress, req.body.logoUrl];
    const {
      name, hqAddress, logoUrl,
    } = req.body;

    try {
      if (req.user.isAdmin === false) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }
      if (!name) {
        return res.status(412).json({
          status: 412,
          error: 'name of party is required',
        });
      }
      if (/^[a-zA-Z_]*$/.test(name) === false) {
        return res.status(406).json({
          status: 406,
          error: 'Not accepted. Name must contain only letters and underscores',
        });
      }
      if (!hqAddress) {
        return res.status(412).json({
          status: 412,
          error: 'Address is required',
        });
      }
      if (/^[A-Za-z0-9 ]+$/.test(hqAddress) === false) {
        return res.status(406).json({
          status: 406,
          error: 'Not accepted. Name must contain only letters, Numbers and spaces,',
        });
      }
      if (!authHelper.isValidName(req.body.AKA)) {
        return res.status(406).json({
          status: 406,
          error: 'Must be letters only',
        });
      }
      if (!logoUrl) {
        return res.status(412).json({
          status: 412,
          error: 'Logo url is required',
        });
      }
      if (/^.*\.(jpg|JPG|PNG|png)$/.test(logoUrl) === false) {
        return res.status(406).json({
          status: 406,
          error: 'Only .JPG or .PNG Accepted',
        });
      }
      /**
    * Add the party to the the database
    * create an  unique id
    * @return {object} - The party object
    */
      await pool.query(sendParty, values);
      const AllParties = await pool.query(selectParty);
      const createdParty = AllParties.rows[AllParties.rowCount - 1];
      return res.status(201).json({
        status: 201,
        data: createdParty,
      });
    } catch (err) {
      return res.status(501).json({
        status: 501,
        error: err.toString(),
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
          status: 404,
          error: 'parties not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
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
    if (!authHelper.isValidNumber(id)) {
      return res.status(406).json({
        status: 406,
        error: 'Input not valid. Value must be a number',
      });
    }
    const partyById = 'SELECT * from parties where id =$1';
    try {
      const { rows } = await pool.query(partyById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'party not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.toString(),
      });
    }
  }

  /**
  * Patch a partyname
  * @param {integer} - id of the party
  * @return {object} - The party that has the specified id with new name
  */
  static async patchPartyName(req, res) {
    const id = Number(req.params.id);
    if (!authHelper.isValidNumber(id)) {
      return res.status(406).json({
        status: 406,
        error: 'Input not valid. Value must be a number',
      });
    }
    const partyName = 'SELECT name from parties where id=$1';
    const { rows } = await pool.query(partyName, [req.params.id]);
    const updateName = `Update parties
    SET name =$1 where id = $2 returning *`;
    const values = [req.body.name || rows[0].name, req.params.id];
    try {
      // check if name inputted is a string
      if (req.user.isAdmin === false) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Party not found',
        });
      }
      const updatedParty = await pool.query(updateName, values);
      return res.status(201).json({
        status: 201,
        data: [updatedParty.rows[0]],
      });
    } catch (err) {
      return res.status(501).json({
        status: 501,
        error: err.toString(),
      });
    }
  }

  /**
  * Delete a party
  * @param {integer} - id of the party
  * @return {object} - The satus code and message to show delte action completed
  */
  static async deleteParty(req, res) {
    const id = Number(req.params.id);
    if (!authHelper.isValidNumber(id)) {
      return res.status(406).json({
        status: 406,
        error: 'Input not valid. Value must be a number',
      });
    }
    try {
      if (req.user.isAdmin === false) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }
      const getParty = 'Select * from parties where id =$1';
      const { rows } = await pool.query(getParty, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Party not found',
        });
      }
      const deleting = 'Delete from parties where id=$1';
      await pool.query(deleting, [req.params.id]);
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'party deleted succesfully',
        }],
      });
    } catch (err) {
      return res.status(501).json({
        status: 501,
        error: 'Delete not implemented',
      });
    }
  }
}
export default partyController;
