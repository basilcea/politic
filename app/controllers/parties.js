import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"


/** Class representing controllers for offices endpoints */
class partyController {
  /**
  * Create an office
  * @param {string} - name of office
  * @param {string} - type of office
  */
  static async createParty(req, res) {
    const sendParty =`INSERT INTO parties (name, AKA ,hqAddress, logoUrl)
    VALUES($1,$2 ,$3 ,$4)`
    const selectParty=`Select * from parties`
    const values =[req.body.name, req.body.AKA ,req.body.hqAddress, req.body.logoUrl]
     const {id, name, AKA, hqAddress, logoUrl} = req.body;

    try{
      if(req.user.isAdmin===false){
        return res.status(401).json({
          "status":401,
          "error": "Unauthorized"
        })
      }
      if (!name) {
        return res.status(412).json({
          "status": 412,
          "error": 'name of party is required'
       });
      }
     if (!hqAddress) {
      return res.status(412).json({
        "status": 412,
        "error": 'Address is required'
        });
      }
      if(!logoUrl){
        return res.status(412).json({
          "status":412,
          "error": 'Logo url is required'
        })
      }
       /**
    * Add the party to the the database
    * create an  unique id
    * @return {object} - The party object
    */
      await pool.query(sendParty, values)
      const AllParties = await pool.query(selectParty)
      const createdParty = AllParties.rows[AllParties.rowCount -1]
      return res.status(201).json({
        "status":201,
        "data":createdParty
      })

    }catch(err){
      return res.status(501).json({
        "status":501,
        "error" : err.toString()
      })
    }
  }




   /**
  * Get all parties
  * @return {object} - array of all parties
  */
  static async getAllParties(req, res) {
    try{
      const getparties =`SELECT * from parties`
      const {rows}= await pool.query(getparties)
      if (!rows[0]) {
        return res.status(404).json({
          "status": 404,
          "error": 'parties not found'
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

  static async getParty(req, res) {
    // force all id string to integer
    const id = parseInt(req.params.id, 10);
    const partyById =`SELECT * from parties where id =$1`
    try{
      const {rows} = await pool.query(partyById , [req.params.id])
      if (!rows[0]) {
        return res.status(404).json({
          "status": 404,
          "error": "party not found"
        });
      }
      return res.status(200).json({
        "status": 200,
        "data": [rows[0]]
      })
    }catch(err){
      return res.status(500).json({
        "status" : 500,
        "error": err.toString()
      })
    }

  }
  static async patchPartyName(req,res){
    const id  = parseInt(req.params.id ,10);
    const partyName =`SELECT name from parties where id=$1`
    const {rows} =  await pool.query(partyName, [req.params.id])
    const updateName =`Update parties
    SET name =$1 where id = $2 returning *`
    const values = [req.body.name || rows[0].name , req.params.id]
    try{
// check if name inputted is a string
  if(req.user.isAdmin===false){
      return res.status(401).json({
        "status":401,
        "error": "Unauthorized"
      })
    }
    if(!rows[0]){
      return res.status(404).json({
        "status":404,
        "error": "Party not found"
      })
    }
    const updatedParty = await pool.query(updateName ,values)
    return res.status(201).json({
      "status":201,
      "data":[updatedParty.rows[0]]
    })
    }catch(err){
      return res.status(501).json({
        "status": 501,
        "error": err.toString()
      })
    }
  }
  static async deleteParty(req, res){
    const id = parseInt( req.params.id ,10)
    try{
      if(req.user.isAdmin ===false){
        return res.status(401).json({
          "status":401,
          "error": "Unauthorized"
        })
      }
      const getParty = `Select * from parties where id =$1`
      const {rows} = await pool.query(getParty, [req.params.id])
      if(!rows[0]){
        return res.status(404).json({
          "status":404,
          "error": "Party not found"
        })
      }
      const deleting = `Delete from parties where id=$1`
      await pool.query(deleting,[req.params.id])
      return res.status(200).json({
        "status":200,
        "data" :[{
          "message": "party deleted succesfully"
        }]
      })

    }catch(err){
      return res.status(501).json({
        "status":501,
        "error": "Delete not implemented"
      })
    }
  }
}
export default partyController

