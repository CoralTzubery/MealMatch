import { Request, Response, NextFunction } from "express";
import { UserModel, User } from "../models/user.model";

export async function requireUser(req: Request, res: Response, next: NextFunction) {
    const cookieId = req.cookies.session;

    if (!cookieId) {
        res.status(401).json({ message: "Unauthorized: no session cookie" });
        return;
    }

    try {
        const user = await UserModel.findOne({ cookieId });

        if (!user) {
            res.status(401).json({ message: "Unauthorized: user was not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Failed to authenticate", error });
    }
}