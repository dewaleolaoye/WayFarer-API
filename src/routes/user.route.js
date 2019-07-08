import express from 'express';
import User from '../controller/user.controller';

const router = express.Router();

// user signup route
router.post('/signup', User.create);


export default router;
