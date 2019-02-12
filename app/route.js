import express from 'express';

import userController from './controllers/users';
import votesController from './controllers/votes';
import officeDB from './controllers/offices';
import partyDB from './controllers/parties';
import candidateController from './controllers/candidate';
import partyDS from './DS/controllers/party';
import officeDS from './DS/controllers/office';

import auth from './middleware/auth';

const partyController = partyDB || partyDS;
const officeController = officeDB || officeDS;

const router = express.Router();

router.post('/auth/signup', userController.signup);
router.post('/auth/login', userController.login);

router.post('/votes', auth.checkToken, votesController.vote);

router.post('/offices', auth.checkToken, officeController.createOffice);
router.get('/offices', auth.checkToken, officeController.getAllOffices);
router.get('/office/:id/result', auth.checkToken, officeController.getOfficeResults);
router.get('/offices/:id', auth.checkToken, officeController.getOffice);
router.post('/office/:id/register', auth.checkToken, candidateController.makeCandidate);

router.post('/parties', auth.checkToken, partyController.createParty);
router.get('/parties', auth.checkToken, partyController.getAllParties);
router.get('/parties/:id', auth.checkToken, partyController.getParty);
router.patch('/parties/:id/name', auth.checkToken, partyController.patchPartyName);
router.delete('/parties/:id', auth.checkToken, partyController.deleteParty);


export default router;
