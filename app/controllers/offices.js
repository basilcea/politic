import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"

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
    const {id, type, name} = req.body
    const sendoffice =`INSERT INTO offices (type ,name)
    VALUES($1,$2)`
    const selectOffice=`Select * from offices`
    const values =[req.body.type , req.body.name]

    try{
      if(req.user.isAdmin === false){
        return res.status(401).json({
          "status":401,
          "error": "Unauthorized"
        })
      }
      if (!type) {
        return res.status(412).json({
          "status": 412,
          "error": 'type of office is required'
       });
      }
      if(/^[a-zA-Z]+$/.test(type)===false){
        return res.status(406).json({
          "status":406,
          "error": 'type must be alphabets only'
        })
      }
     if (!name) {
      return res.status(412).json({
        "status": 412,
        "error": 'name of office is required'
        });
      }
      if(/^[a-zA-Z]+$/.test(name)===false){
        return res.status(406).json({
          "status":406,
          "error": 'name must be alphabets only'
        })
      }
       /**
    * Add the office object to the the database
    * create an  unique id
    * @return {object} - The office object
    */
      await pool.query(sendoffice, values)
      const AllOffices =await pool.query(selectOffice)
      const createdOffice = AllOffices.rows[AllOffices.rowCount-1]
      return res.status(201).json({
        "status":201,
        "data":createdOffice
      })

    }catch(err){
      return res.status(501).json({
        "status":501,
        "error" : err.toString()
      })
    }
  }

   /**
  * Get all offices
  * @return {object} - array of all offices
  */
  static async getAllOffices(req, res) {
    try{
      const getoffices =`SELECT * from offices`
      const {rows}= await pool.query(getoffices)
      if (!rows[0]) {
        return res.status(404).json({
          "status": 404,
          "error": 'offices not found'
        });
      }
      return res.status(200).json({
        "status": 200,
        "data": rows
      });
    }catch(err){
      return res.status(500).json({
        "status": 500,
        "error" : err.toString()
      })
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
    if(!authHelper.isValidNumber(id)){
      return res.status(406).json({
        "status":406,
        "error" : "Input not valid. Value must be a number"
      })
    }
    const officeById =`SELECT * from offices where id =$1`
    try{
      const {rows} = await pool.query(officeById , [req.params.id])
      if (!rows[0]) {
        return res.status(404).json({
          "status": 404,
          "error": "office not found"
        });
      }
      return res.status(200).json({
        "status": 200,
        "data": rows[0]
      })
    }catch(err){
      return res.status(500).json({
        "status" : 500,
        "error": err.toString()
      })
    }

  }

  /**
  * Get office result
  * @param {integer} - id of the office
  * @return {object} -All  office with the id
  */
  static async getOfficeResults(req, res){
    const officeId = Number(req.params.id)
    // check if input string is valid.
    if(!authHelper.isValidNumber(officeId)){
      return res.status(406).json({
        "status":406,
        "error" : "Input not valid. Value must be a number"
      })
    }
    const selectResult =`SELECT office, candidate , count(candidate) result  from votes
    where office = $1  Group BY (candidate ,office) `
    try{
      const getResult = await pool.query(selectResult ,[req.params.id])
      return res.status(200).json({
        "status":200,
        "data": getResult.rows
      })

    }catch(err){
      return res.status(501).json({
        "status": 501,
        "error":err.toString()
      })
    }
  }
}
export default officeController

