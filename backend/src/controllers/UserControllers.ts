import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();
export async function getUserName(req: UserRequest, res: Response) {
  const currentUser = req.user;
  const user = await prisma.user.findFirst({
    where: {
      id: currentUser?.id,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.json({ username: user.username });
}

export async function createWorkspace(req: UserRequest, res: Response) {
  try {
    // Get current logged-in user
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: currentUser.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Workspace name is required" });
    }

    const existingWorkSpace= await prisma.workspace.findFirst({
        where:{
            name,
            userId:user.id
        }
    })
    if(existingWorkSpace){
        return res.status(400).json({message:"Workspace with same name already exists"})
    }

    const newWorkspace = await prisma.workspace.create({
        data: {
          name,
          userId: user.id, 
        },
      });
    return res.status(201).json({ workspace: newWorkspace });
  } catch (error) {
    console.error("Error creating workspace:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function getWorkSpaces(req:UserRequest,res:Response) {
  try {
    
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await prisma.user.findFirst({
      where: {
        id: currentUser.id,
      },
    });
    const workspaces=await prisma.workspace.findMany({
      where:{
        userId:user?.id
      }
    })
    
    return res.status(200).json(workspaces)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

