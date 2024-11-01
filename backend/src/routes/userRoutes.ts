import express from "express";
import { createWorkspace, getUserName, getWorkSpaces,createLink } from "../controllers/UserControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router=express.Router();

router.get("/username",verifyToken,getUserName);
router.post("/workspace",verifyToken,createWorkspace)
router.get("/workspaces",verifyToken,getWorkSpaces)
router.post("/createlink",verifyToken,createLink)

export default router;