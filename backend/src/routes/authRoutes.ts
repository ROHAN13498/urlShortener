import express from "express";
import { login,logout,refreshToken,signUp } from "../controllers/authControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.post("/logout", verifyToken,logout);
router.post("/signup",signUp);
// router.post("/test",verifyToken,(req,res)=>{
//     return res.json("authorization granted");
// })

export default router;
