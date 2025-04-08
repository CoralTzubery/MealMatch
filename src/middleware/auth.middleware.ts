import { Request, Response, NextFunction } from "express";
import { UserModel, User } from "../models/user.model";

export async function requiredUser(req: Request & { user?: User }, res: Response, next: NextFunction) {
    const cookieId = req.cookies.session;

    if (!cookieId) {
        return res.status(401).json({ message: "Unauthorized: no session cookie" });
    }

    try {
        const user = await UserModel.findOne({ cookieId });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: user was not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Failed to authenticate", error });
    }
}