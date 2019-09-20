import { Router } from 'express';
import User from '../controller/user.controller';

const router = Router();

router.post('/signup', User.sign_up);
router.post('/signin', User.login);

export default router;
