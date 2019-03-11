/* eslint-disable import/no-named-as-default-member */
import express from 'express';

import userController from './controllers/users';
import userActivityController from './controllers/activity';
import votesController from './controllers/votes';
import officeDB from './controllers/offices';
import partyDB from './controllers/parties';
import candidateController from './controllers/candidate';
import petitionController from './controllers/petition';
import interestController from './controllers/interest';
import partyDS from './DS/controllers/party';
import officeDS from './DS/controllers/office';

import auth from './middleware/auth';
import validation from './middleware/validate';

const partyController = partyDB || partyDS;
const officeController = officeDB || officeDS;

const router = express.Router();

router.get('/auth/decrypt', auth.checkToken, userController.decrypt);
router.post('/auth/signup', validation.signup, userController.signup);
router.post('/auth/login', validation.login, userController.login);
router.post('/auth/reset', validation.resetPassword, userController.resetPassword);
router.post('/auth/forgot', validation.forgotPassword, userController.forgotPassword);
router.get('/auth/logout', userController.logout);

router.get('/users/me', auth.checkToken, userActivityController.getProfile);
router.patch('/users/me/edit', validation.editProfile, auth.checkToken, userActivityController.editProfile);
router.patch('/users/me/password', validation.changePassword, auth.checkToken, userActivityController.changePassword);
router.delete('/users/me', auth.checkToken, userActivityController.deleteProfile);
router.patch('/admin/user/:id', auth.checkToken, userActivityController.makeAdmin);


router.post('/votes', auth.checkToken, votesController.vote);
router.get('/office/:id/result', auth.checkToken, votesController.getOfficeResults);
// route for get all user voting activities


router.post('/offices', auth.checkToken, officeController.createOffice);
router.get('/offices', auth.checkToken, officeController.getAllOffices);
router.get('/offices/:id', auth.checkToken, officeController.getOffice);
router.patch('/offices/:id', auth.checkToken, officeController.editOffice);
router.delete('/offices/:id', auth.checkToken, officeController.deleteOffice);

router.post('/office/:id/register', auth.checkToken, candidateController.makeCandidate);
router.get('/office/:id/candidates', auth.checkToken, candidateController.searchCandidate);
router.put('/candidates/:id', auth.checkToken, candidateController.editCandidate);
router.delete('/candidates/:id', auth.checkToken, candidateController.deleteCandidate);

router.post('/parties',validation.createParty,  auth.checkToken, partyController.createParty);
router.get('/parties', auth.checkToken, partyController.getAllParties);
router.get('/parties/:id', auth.checkToken, partyController.getParty);
router.patch('/parties/:id/:value', auth.checkToken, partyController.editParty);
router.delete('/parties/:id', auth.checkToken, partyController.deleteParty);

router.get('/petitions', auth.checkToken, petitionController.getUserPetition);
router.get('/petitions/:id', auth.checkToken, petitionController.getAPetition);
router.post('/petitions', auth.checkToken, petitionController.createPetition);
router.patch('/petitions/:id', auth.checkToken, petitionController.editPetition);
router.delete('/petitions/:id', auth.checkToken, petitionController.deletePetition);

router.get('/interests', auth.checkToken, interestController.getInterest);
router.post('/interests', auth.checkToken, interestController.createInterest);
router.put('/interests/:id', auth.checkToken, interestController.editInterest);
router.delete('/interests/:id', auth.checkToken, interestController.deleteInterest);
export default router;
