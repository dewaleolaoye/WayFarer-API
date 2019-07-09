import express from 'express';
import User from '../controller/user.controller';

const router = express.Router();

router.post('/signup', User.create);
router.post('/signin', User.login);

export default router;
