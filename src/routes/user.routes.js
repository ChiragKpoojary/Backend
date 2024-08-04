import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js'; // Adjust the path as needed for the file

const router = Router();
console.log("hi my name is chirag");
router.post('/register', registerUser);

export { router as userRouter };
