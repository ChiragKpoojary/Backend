import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js'; // Adjust the path as needed

const router = Router();

router.post('/register', registerUser);

export { router as userRouter };
