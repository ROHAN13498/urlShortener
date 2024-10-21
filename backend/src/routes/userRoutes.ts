import express from "express";
import { createWorkspace, getUserName, getWorkSpaces } from "../controllers/UserControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router=express.Router();

router.get("/username",verifyToken,getUserName);
router.post("/workspace",verifyToken,createWorkspace)
router.get("/workspaces",verifyToken,getWorkSpaces)

export default router;