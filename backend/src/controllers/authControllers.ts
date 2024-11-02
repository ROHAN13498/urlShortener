import { Request, Response } from "express";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/tokenUtils";
import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../middlewares/authMiddleware";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    console.log("login request");
    const { email, password } = req.body; 

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = createAccessToken({ id: user.id, username: user.username });
        const refreshToken = createRefreshToken({ id: user.id, username: user.username });

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict" 
        });
        console.log("access token set");

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict"
        });
        console.log("refresh token set");

        res.status(200).json({ message: "Login successful", accessToken });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    console.log("Requesting new access token");
    const token = req.cookies.refreshToken; 

    if (!token) return res.status(401).json({ message: "Refresh token missing" });

    try {
        const verified = verifyRefreshToken(token);
        if (!verified) return res.status(403).json({ message: "Invalid refresh token" });

        const user = await prisma.user.findUnique({ where: { id: verified.id } });
        if (!user || user.refreshToken !== token) return res.status(403).json({ message: "Invalid refresh token or expired token" });

        const accessToken = createAccessToken({ id: user.id, username: user.username });

        res.cookie("accessToken", accessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({ message: "Access token refreshed" });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req: UserRequest, res: Response) => {
    console.log("logging out user")
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken"); 

    const user = req.user; 

    if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: null }, 
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: await bcrypt.hash(password, 10), 
            },
        });
        const newWorkSpace= await prisma.workspace.create({
            data:{
                name:"default",
                userId:newUser.id
            }
        })

        res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
