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
                'status': 201,
                'data': AllInterests.rows[AllInterests.rowCount - 1],
            });
        } catch (err) {
            return res.status(501).json({
                'status': 501,
                'error': err.toString(),
            });
        }
    }
}
export default interestController;
