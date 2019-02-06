import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"


class votesController {
  static async vote(req,res){
    // check if candidate exist
    // check if voter exist for that office
    //if not input a candidate


    const Candidates = `Select * from candidates where id = ${req.body.candidate}`
    const getOffice =`Select office from votes where createdby = ${req.user.id}`
    const postVote =`INSERT INTO votes(office,candidate)
    VALUES($1 , $2 )`
    const values =[
      req.body.office,
      req.body.candidate
    ]
    try{

      const officeId = Number(req.body.office)

      if(!authHelper.isValidNumber(officeId)){
        return res.status(406).json({
          "status": 406,
          "error": "office input not valid"
        })
      }

      const checkOffice =await pool.query(getOffice)
      if(checkOffice.rows[0]){
        return res.status(405).json({
          "status": 405,
          "error" : "You have already voted for this office"
        })
      }
console.log('here')
      const candidateId = Number(req.body.candidate)

      if(!authHelper.isValidNumber(candidateId)){
        return res.status(406).json({
          "status": 406,
          "error": "candidate input not valid"
        })
      }
      const getCandidate = await pool.query(Candidates)
      if(!getCandidate.rows[0]){
        return res.status(404).json({
          "status":404,
          "error": "Not a candidate"
        })
      }

      const posting = await pool.query(postVote, values)
      return res.status(201).json({
        "status" : 201,
        "data": {
          "office":posting.rows[0].office,
          "candidate": posting.rows[0].candidate,
          "voter": req.user.id
        }
      })
    } catch(err){
      return res.status(501).json({
        "status":501,
        "error": err.toString()
      })
    }
  }
}






export default votesController