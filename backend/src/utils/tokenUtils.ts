import jwt from "jsonwebtoken";

import { User } from "@prisma/client";
import { UserPayload } from "../middlewares/authMiddleware";


export const createAccessToken = (user:UserPayload) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

export const createRefreshToken = (user:UserPayload) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

export const verifyRefreshToken = (token:string) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as UserPayload;
    } catch (error) {
        return null;
    }
};
