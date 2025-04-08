import { Router, Request, Response } from "express";
import { MatchModel } from "../models/match.model";
import { Types } from "mongoose";
import { requireUser } from "../middleware/auth.middleware";
import { match } from "assert";

export const matchRouter = Router();

matchRouter.get("/", requireUser, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const matches = await MatchModel.find({ userId: req.user._id }).populate("meal").populate("workout");
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch matches", error });
    }

});

matchRouter.post("/", requireUser, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const newMatch = new MatchModel({ ...req.body, userId: req.user._id });
        const savedMatch = await newMatch.save();
        const populatedMatch = await savedMatch.populate(["meal", "workout"]);
        res.status(201).json(populatedMatch);
    } catch (error) {
        res.status(400).json({ message: "Failed to create a match", error });
    }
});

matchRouter.get("/:id", requireUser, async (req:Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid match id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const match = await MatchModel.findOne({ _id: id, userId: req.user._id }).populate("meal").populate("workout");
        
        if (!match) {
            res.status(404).json({ message: "Match was not found" });
            return;
        }

        res.json(match);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch match", error });
    }
});

matchRouter.put("/:id", requireUser, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid match id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const updatedMatch = await MatchModel.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body, { new: true, runValidators: true }).populate("meal").populate("workout");
        
        if (!updatedMatch) {
            res.status(404).json({ message: "Match was not found" });
            return;
        }

        res.json(updatedMatch);
    } catch (error) {
        res.status(500).json({ message: "Faild to update match", error });
    }
});

matchRouter.delete("/:id", requireUser, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid match id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const deletedMatch = await MatchModel.findOneAndDelete({ _id: id, userId: req.user._id });
        
        if (!deletedMatch) {
            res.status(404).json({ message: "Match was not found" });
            return;
        }

        res.json({ message: "Match deleted successfully", deletedMatch });
    } catch (error) {
        res.status(500).json({ message: "Faild to delete match", error });
    }
});