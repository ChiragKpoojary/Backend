import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js'; // Adjust the path as needed for the file
import upload from "../middlewares/multer.middleware.js";
const router = Router();
console.log("hi my name is chirag");
router.route('/register').post(
  upload.fields([
    {
      name:"avatar",
      maxcount:1
    },
    {
      name:"coverimage",
      maxcount:1
    }
  ]),
  registerUser);

export { router as userRouter };
