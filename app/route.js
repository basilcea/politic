import express from 'express'

import partyController from './DS/controllers/party' ;

const router = express.Router();

// parties route
router.post('/parties', partyController.createParty);
router.get('/parties', partyController.getAllParties);
router.get('/parties/:id', partyController.getParty);
router.delete('/parties/:id', partyController.deleteParty);
router.patch('/parties/:id/name', partyController.editPartyName);

router.post('/parties', partyController.createParty);
router.get('/parties', partyController.getAllParties)



export default router;