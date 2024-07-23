import { Router } from 'express';
import userModel from '../../../Database/models/user.model.js';

import { auth } from '../../middelware/auth.js';
import { getAllUsers, login, register } from './user.controller.js';
const router = Router();



router.get('/', auth,getAllUsers)

router.post('/register',register)


router.post('/login',login)


export default router