import { Router, Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const userRouter = Router();

userRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "faild to fetch users", error });
    }

});

userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: "failed to create a user", error });
    }
});
