import pool from '../migrate';
import authHelper  from '../helpers/auth';
import 'dotenv';
import "@babel/polyfill"

class candidateController{
  static async makeCandidate(req, res){
    // check if candidates exists

  const checkCandidate =`SELECT * from candidates where id=$1`
  const checkOffice = `SELECT * from offices where id=$1`
  const checkUser =`SELECT * from users where id =$1`
  const insertCandidate =`Insert into candidates (office ,candidate)
  Values($1,$2)`
  try{
     if(req.user.isAdmin === false){
        return res.status(401).json({
          "status":401,
          "error": "Unauthorized"
        })
      }
    const {rows} = await pool.query(checkUser , [req.params.id])
    if(!rows[0]){
      return res.status(404).json({
        "status": 404,
        "error": "User not found"
      })
    }

  const office = await pool.query(checkOffice ,[req.body.office])
  if (!office.rows[0]){
    return res.status(404).json({
      "status":404,
      "error": "office not found"
    })
  }
  const candidate = await pool.query(checkCandidate , [req.body.user])
  if(candidate.row[0]){
    return res.status(404).json({
      "status":404,
      "error": "Candidate Already exists"
    })
  }
   const inserted = await pool.query(insertCandidate,[req.body.office, req.body.user])
   return res.status(201).json({
     "status":201,
     "data":{
       "office": inserted.rows[rowsCount-1].office,
       "user": inserted.rows[rowsCount-1].office
      }
    })
  }catch(err){
    return res.status(500).json({
      "status":500,
      "error": "Not implemented"
    })
  }

  }
}
export default candidateController