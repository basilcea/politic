/* eslint-disable quote-props */
import pool from '../migrate';
import authHelper from '../helpers/auth';
import 'dotenv';
import '@babel/polyfill';
import * as validation from '../helpers/schema';

/**
  * Represents a controller  class for all office endpoints
  * @class officeController
 */
class officeController {
  /**
    * Create  a user
    * @async requestPromises
    * @method signup
    * @params {object} request - The form data to be inputted
    * @return {object} response - The status code and data.
    *
   */
  static async createOffice(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
    }
    validation.check(req.body, validation.createOfficeSchema, res);

    const { type, name , electDate} = req.body;
    const sendoffice = `INSERT INTO offices (type ,name ,electDate)
    VALUES($1,$2)`;
    const selectOffice = 'Select * from offices';
    const values = [type.trim(), name.trim().toLowerCase() , electDate.trim()];

    try {
      /**
    * Add the office object to the the database
    * create an  unique id
    * @return {object} - The office object
    */
      const AllOffices = await pool.query(selectOffice);
      if (authHelper.isUniqueName(name, AllOffices) !== null) {
        return res.status(422).json({
          'status': 422,
          'error': 'Office already exists',
        });
      }
      await pool.query(sendoffice, values);

      const createdOffice = AllOffices.rows[AllOffices.rowCount - 1];
      return res.status(201).json({
        'status': 201,
        'data': createdOffice,
      });
    } catch (err) {
      return res.status(501).json({
        'status': 501,
        'error': err.toString(),
      });
    }
  }

  /**
  * Get all offices
  * @return {object} - array of all offices
  */
  static async getAllOffices(req, res) {
    try {
      const getoffices = 'SELECT * from offices';
      const { rows } = await pool.query(getoffices);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'offices not found',
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
  * Get an office
  * @param {integer} - id of the office
  * @return {object} -An office with the id
  */

  static async getOffice(req, res) {
    // force all id string to integer
    const id = Number(req.params.id);

    // validate that string is a number
    validation.check(id, validation.id, res);


    const officeById = 'SELECT * from offices where id =$1';
    try {
      const { rows } = await pool.query(officeById, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'office not found',
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
  static async editOffice(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        'status': 401,
        'error': 'Unauthorized',
      });
    }
    const id = Number(req.params.id);
    // eslint-disable-next-line prefer-destructuring
    validation.check(id, validation.id, res);
    validation.check(req.body, validation.editOfficeSchema, res);
    const { type, name, electDate } = req.body
    const getOffice = 'Select * from offices where id=$1';
    const { rows } = await pool.query(getOffice, [id]);
    const updateOffice = 'update offices set type=$1, name=$2 , electDate =$3 where id=$4 returning *';
    const values = [
      type || rows[0].type,
      name || rows[0].name,
      electDate || rows[0].electDate,
      id
    ]
    try {
      if (!rows[0]) {
        return res.status(404).json({
          'status': 404,
          'error': 'Party not found',
        });
      }
      const updatedOffice = await pool.query(updateOffice, values);
      return res.status(201).json({
        'status': 201,
        'data': updatedOffice.rows[0],
      });
      
    } catch (err) {
      return res.status(500).json({
        'status': 500 ,
        'error': err.toString()
      })
    }
  }
}
export default officeController;
