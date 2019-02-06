import express from 'express';

import userController from './controllers/users';
import votesController from './controllers/votes';
import officeController from './controllers/offices';
import partyController from './controllers/parties';
import candidateController from './controllers/candidate';

import auth from './middleware/auth'

const router = express.Router();
//users route
router.post('/auth/signup', userController.signup)
router.post('/auth/login', userController.login)
router.post('/votes', auth.checkToken, votesController.vote)
router.post('/offices', auth.checkToken, officeController.createOffice)
router.get('/offices', auth.checkToken, officeController.getAllOffices)
router.get('/offices/:id', auth.checkToken, officeController.getOffice)
router.post('/parties', auth.checkToken, partyController.createParty)
router.get('/parties', auth.checkToken, partyController.getAllParties)
router.get('/parties/:id', auth.checkToken, partyController.getParty)
router.patch('/parties/:id/name', auth.checkToken, partyController.patchPartyName)
router.delete('/parties/:id', auth.checkToken, partyController.deleteParty)
router.post('/office/:id/register', auth.checkToken, candidateController.makeCandidate)

/*
//Admin route
// make Admin
// make candiddates

// parties route
router.post('/parties', partyController.createParty);
router.get('/parties', partyController.getAllParties);
router.get('/parties/:id', partyController.getParty);
router.delete('/parties/:id', partyController.deleteParty);
router.patch('/parties/:id/name', partyController.editPartyName);

// office routes

router.post('/offices', officeController.createOffice);
router.get('/offices', officeController.getAllOffices);
router.get('/offices/:id', officeController.getOffice);*/

export default router;
