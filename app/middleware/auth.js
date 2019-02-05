import jwt from 'jsonwebtoken';
import pool from '../migrate';
import 'dotenv';

const auth = {
    async checkToken (req,res,next){
        const  token = req.headers['x-access-token']

        if(!token) {
            return res.status(400).send({ 'message': 'You need to Login' });
        }
        try{
            const decrypt = await jwt.verify(token, process.env.SECRET);
            const getUser ='SELECT * FROM users WHERE userId= $1';

            const {rows} = await client.query(getUser,[decrypt.userId]);
            if (!rows[0]){
                return res.status(400).json({
                    'message':'Not accessible'
                })
            }
            req.user = {
                userId: decrypt.userId,
                isCandidate: decrypt.isCandidate,
                isAdmin: decrypt.isAdmin
                };
            next();
        }catch(error){
            return res.status(400).send(error);
        }
    },

}
export default auth;
