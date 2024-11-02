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

    const existingWorkSpace = await prisma.workspace.findFirst({
      where: {
        name,
        userId: user.id,
      },
    });
    if (existingWorkSpace) {
      return res
        .status(400)
        .json({ message: "Workspace with same name already exists" });
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

export async function getWorkSpaces(req: UserRequest, res: Response) {
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
    const workspaces = await prisma.workspace.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(workspaces);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUrls(req: UserRequest, res: Response) {
  const currentUser = req.user;
  if (!currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await prisma.user.findFirst({
    where: {
      id: currentUser.id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
}

export async function getLongUrl(req: Request, res: Response) {
  const shortUrl = req.params.shorturl;
  console.log(shortUrl);
  const url = await prisma.url.findFirst({
    where: {
      shortUrl: shortUrl,
    },
  });
  console.log(url)

  return res.status(200).json({ link: url?.longUrl });
}

export async function createLink(req: UserRequest, res: Response) {
  const currentUser = req.user;
  if (!currentUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await prisma.user.findFirst({
    where: {
      id: currentUser.id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
  const { longUrl, shortUrl, expirationDate, expirationTime, workspace } =
    req.body;
  if (!longUrl || !shortUrl) {
    return res
      .status(400)
      .json({ message: "Long URL and Short URL are required" });
  }
  try {
    const userWorkSpace = await prisma.workspace.findFirst({
      where: {
        userId: user.id,
        name: workspace,
      },
    });
    if (!userWorkSpace) {
      return res.status(404).json({ message: "Workspace Not Found" });
    }
    const expiresAt = expirationDate
      ? new Date(`${expirationDate}T${expirationTime || "00:00"}`)
      : null;

    const newLink = await prisma.url.create({
      data: {
        longUrl,
        shortUrl,
        expiresAt: expiresAt || null,
        workspaceId: userWorkSpace.id,
      },
    });
    console.log(newLink)
    return res.status(201).json({ message: "Link Created", link: newLink });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
