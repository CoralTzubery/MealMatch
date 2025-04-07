import { Router, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { randomUUID } from "crypto";

export const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
    const { username, passwrod } = req.body;

    console.log("LOGIN BODY:", req.body);

    if (!username || !passwrod) {
        res.status(400).json({ message: "Username and password are required" });
        return;
    }

    try {
        const user = await UserModel.findOne( {username });

        if (!user || user.password !== passwrod ) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }  

        const cookieId = randomUUID();
        user.cookieId = cookieId;
        await user.save();
        res.cookie("session", cookieId, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).json({ message: "Login successfully", user: {_id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Failed to login", error });
    }
});