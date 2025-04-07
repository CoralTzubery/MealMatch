import { Router, Request, Response } from "express";
import { MatchModel } from "../models/match.model";
import { Types } from "mongoose";

export const matchRouter = Router();

matchRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const matches = await MatchModel.find().populate("meal").populate("workout");
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch matches", error });
    }

});

matchRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newMatch = new MatchModel(req.body);
        const savedMatch = await newMatch.save();
        res.status(201).json(savedMatch);
    } catch (error) {
        res.status(400).json({ message: "Failed to create a match", error });
    }
});

matchRouter.get("/:id", async (req:Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid match id format" });
        return;
    }

    try {
        const match = await MatchModel.findById(id).populate("meal").populate("workout");
        
        if (!match) {
            res.status(404).json({ message: "Match was not found" });
            return;
        }

        res.json(match);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch match", error });
    }
});

matchRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid match id format" });
        return;
    }

    try {
        const updatedMatch = await MatchModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!updatedMatch) {
            res.status(404).json({ message: "Match was not found" });
            return;
        }

        res.json(updatedMatch);
    } catch (error) {
        res.status(500).json({ message: "Faild to update match", error });
    }
});

matchRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid match id format" });
        return;
    }

    try {
        const deletedMatch = await MatchModel.findByIdAndDelete(id);
        
        if (!deletedMatch) {
            res.status(404).json({ message: "Match was not found" });
            return;
        }

        res.json({ message: "Match deleted successfully", deletedMatch });
    } catch (error) {
        res.status(500).json({ message: "Faild to delete match", error });
    }
});