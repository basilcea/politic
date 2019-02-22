import pool from '../migrate';
import * as validation from '../helpers/schema';

class interestController {
  static async createInterest(req, res) {
    const { office, party } = req.body;
    const getUser = 'Select * from users where id= $1 AND registeras =$2';
    const checkPolitician = await pool.query(getUser, [req.user.id, 'politician']);
    if (!checkPolitician.rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'User is not a politician',
      });
    }
    validation.check(req.body, validation.createInterestSchema, res);
    const sendInterest = `INSERT INTO interests (office, party, interest)
    VALUES($1, $2 ,$3 )`;
    const selectInterest = 'Select * from interests';
    const values = [office, party, req.user.id];
    try {
      /**
          * Add the interest to  the database
          * create a unique Id
          * @return {object} - The interest object
            */
      await pool.query(sendInterest, values);

      const AllInterests = await pool.query(selectInterest);

      return res.status(201).json({
        status: 201,
        data: AllInterests.rows[AllInterests.rowCount - 1],
      });
    } catch (err) {
      return res.status(501).json({
        status: 501,
        error: err.toString(),
      });
    }
  }

  static async editInterest(req, res) {

    const id = Number(req.params.id);
    // eslint-disable-next-line prefer-destructuring
    validation.check(id, validation.id, res);
    const getUserInterests = 'Select * from interests where interest=$1 and id =$2';
    const { rows } = await pool.query(getUserInterests, [req.user.id, id]);
    if (!rows[0]) {
      return res.status(401).json({
        status: 401,
        Error: 'Interest not found',
      });
    }
    const {
      office, party,
    } = req.body;
    validation.check(req.body, validation.editInterestSchema, res);
    const updateInterest = `Update interests
        SET office = $1 , party =$2 where id = $3 returning *`;
    const values = [
      office || rows[0].office,
      party || rows[0].party,
      id];
    try {
      const updatedInterest = await pool.query(updateInterest, values);
      return res.status(201).json({
        status: 201,
        data: updatedInterest.rows[0],
      });
    } catch (err) {
      return res.status(501).json({
        status: 501,
        error: err.toString(),
      });
    }
  }
}
export default interestController;
