import express from 'express';

import userController from './controllers/users';


import auth from './middleware/auth'

const router = express.Router();
//users route
router.post('/auth/signup', userController.signup)


export default router;
