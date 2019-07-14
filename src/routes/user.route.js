import express from 'express';
import User from '../controller/user.controller';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/signup', User.create);
router.post('/signin', Auth.verifyToken, User.login);

export default router;
