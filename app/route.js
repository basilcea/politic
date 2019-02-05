import express from 'express';

import userController from './controllers/users';
import auth from './middleware/auth'

const router = express.Router();
//users route
router.post('/auth/signup', userController.signup)
router.post('/auth/login', userController.login)
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
