import express from 'express'

import partyController from './DS/controllers/party' ;

const router = express.Router();


router.post('/parties', partyController.createParty);



export default router;