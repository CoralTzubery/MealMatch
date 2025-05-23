import { Router, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { Types } from "mongoose";
import { requireUser } from "../middleware/auth.middleware";

export const userRouter = Router();

userRouter.get("/me", requireUser, (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    
    res.json({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
    });
});

userRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch users", error });
    }

});

userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: "Failed to create a user", error });
    }
});

userRouter.get("/:id", async (req:Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid user id format" });
        return;
    }

    try {
        const user = await UserModel.findById(id);
        
        if (!user) {
            res.status(404).json({ message: "User was not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch user", error });
    }
});

userRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid user id format" });
        return;
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!updatedUser) {
            res.status(404).json({ message: "User was not found" });
            return;
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Faild to update user", error });
    }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid user id format" });
        return;
    }

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        
        if (!deletedUser) {
            res.status(404).json({ message: "User was not found" });
            return;
        }

        res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Faild to delete user", error });
    }
});

