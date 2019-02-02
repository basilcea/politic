import express from 'express'

import partyController from './DS/controllers/party' ;

const router = express.Router();

// parties route
router.post('/parties', partyController.createParty);
router.get('/parties', partyController.getAllParties);
router.get('/parties/:id', partyController.getParty);



export default router;