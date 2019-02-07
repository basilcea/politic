import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"

/**
  * Represents a controller  class for all candidate specific acitvities
  * @class candidateController
 */

class candidateController{
   /**
    * Create  a candidate
    * @async requestPromises
    * @method makeCandidate
    * @params {object} id - The user id to be inputted
    * @return {object} response - The status code and data to be outputted if input passes validation
    * @return {object} response - The status code and error message to be outputted fails validation.
    *
   */

  static async makeCandidate(req, res){
    // check if candidates exists

  const checkCandidate =`SELECT * from candidates where id = $1`
  const checkOffice = `SELECT * from offices where id= $1`
  const checkUser =`SELECT * from users where id = $1`
  const insertCandidate =`Insert into candidates (office , candidate ,party)
  Values($1,$2 ,$3)`
  try{
    // check if user is admin
    if(req.user.isAdmin === false){
      return res.status(401).json({
        "status":401,
        "error": "Unauthorized"
      })
    }
    // force all number string to integer
    const userId = Number(req.params.id)
    const officeId = Number(req.body.office)
    const candidateId = Number(req.body.user)
    const partyId = Number(req.body.party)

    // check if user id is an integer
    if(!authHelper.isValidNumber(userId)){
      return res.status(406).json({
        "status": 406,
        "error" : "Input not valid. Id must be a number"
      })
    }
    if(!authHelper.isValidNumber(officeId)){
      return res.status(406).json({
        "status": 406,
        "error" : "Input not valid. Id must be a number"
      })
    }
    if(!authHelper.isValidNumber(candidateId)){
      return res.status(406).json({
        "status": 406,
        "error" : "Input not valid. Id must be a number"
      })
    }
     if(!authHelper.isValidNumber(partyId)){
      return res.status(406).json({
        "status": 406,
        "error" : "Input not valid. Id must be a number"
      })
    }
    // check if  user exists
    const {rows} = await pool.query(checkUser ,[req.params.id])
    if(!rows[0]){
      return res.status(404).json({
        "status": 404,
        "error": "User not found"
      })
    }
  // check if office exist
  const office = await pool.query(checkOffice ,[req.body.office])
  if (!office.rows[0]){
    return res.status(404).json({
      "status":404,
      "error": "office not found"
    })
  }
  const candidate = await pool.query(checkCandidate , [req.body.user])
  if(candidate.rows[0]){
    return res.status(404).json({
      "status":404,
      "error": "Candidate already exists"
    })
  }
   const inserting = await pool.query(insertCandidate,[req.body.office, req.body.user, req.body.party])
   const inserted = await pool.query(`SELECT * from candidates`)
   return res.status(201).json({
     "status":201,
     "data":{
       "office": inserted.rows[inserted.rowCount-1].office,
       "user": inserted.rows[inserted.rowCount-1].candidate
      }
    })
  }catch(err){
    return res.status(500).json({
      "status":500,
      "error": err.toString()
    })
  }

  }
}
export default candidateController