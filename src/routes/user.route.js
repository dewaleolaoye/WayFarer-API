import express from 'express';
import User from '../controller/user.controller';

const router = express.Router();

router.post('/auth/signup', User.create);
router.post('/auth/login', User.login);

export default router;
