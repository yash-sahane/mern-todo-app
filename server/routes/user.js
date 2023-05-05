import express from 'express';
import { getAllUsers, registerUser, fetchMyProfile, loginUser, logoutUser } from '../controllers/user.js';
import isAuthenticated from '../middlewares/auth.js';

export const router = express.Router();

router.get('/all', getAllUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', isAuthenticated, logoutUser);

router.get('/me', isAuthenticated, fetchMyProfile);

export default router;