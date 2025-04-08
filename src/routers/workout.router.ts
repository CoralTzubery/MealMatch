import { Router, Request, Response } from "express";
import { WorkoutModel } from "../models/workout.model";
import { Types } from "mongoose";
import { requireUser } from "../middleware/auth.middleware";

export const workoutRouter = Router();

workoutRouter.get("/", requireUser, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const workouts = await WorkoutModel.find({ userId: req.user._id });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch workouts", error });
    }

});

workoutRouter.post("/", requireUser, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const newWorkout = new WorkoutModel({ ...req.body, userId: req.user._id });
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(400).json({ message: "Failed to create a workout", error });
    }
});

workoutRouter.get("/:id", requireUser, async (req:Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid workout id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const workout = await WorkoutModel.findOne({ _id: id, userId: req.user._id });
        
        if (!workout) {
            res.status(404).json({ message: "Workout was not found" });
            return;
        }

        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch workout", error });
    }
});

workoutRouter.put("/:id", requireUser, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid workout id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const updatedWorkout = await WorkoutModel.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body, { new: true, runValidators: true });
        
        if (!updatedWorkout) {
            res.status(404).json({ message: "Workout was not found" });
            return;
        }

        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ message: "Faild to update workout", error });
    }
});

workoutRouter.delete("/:id", requireUser, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid workout id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const deletedWorkout = await WorkoutModel.findOneAndDelete({ _id: id, userId: req.user._id });
        
        if (!deletedWorkout) {
            res.status(404).json({ message: "Workout was not found" });
            return;
        }

        res.json({ message: "Workout deleted successfully", deletedWorkout });
    } catch (error) {
        res.status(500).json({ message: "Faild to delete workout", error });
    }
});

