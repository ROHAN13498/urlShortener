import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
    id: string; 
    username: string;
}

export interface UserRequest extends Request {
    user?: UserPayload;
}

export const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies['accessToken'];
    if (!token) return res.status(401).json({ message: "Access token missing" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: VerifyErrors | null, decoded?: object | string) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = decoded as UserPayload;
        next();
    });
};
