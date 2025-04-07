import { Router, Request, Response } from "express";
import { WorkoutModel } from "../models/workout.model";
import { Types } from "mongoose";

export const workoutRouter = Router();

workoutRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const workouts = await WorkoutModel.find();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch workouts", error });
    }

});

workoutRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newWorkout = new WorkoutModel(req.body);
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(400).json({ message: "Failed to create a workout", error });
    }
});

workoutRouter.get("/:id", async (req:Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid workout id format" });
        return;
    }

    try {
        const workout = await WorkoutModel.findById(id);
        
        if (!workout) {
            res.status(404).json({ message: "Workout was not found" });
            return;
        }

        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch workout", error });
    }
});

workoutRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid workout id format" });
        return;
    }

    try {
        const updatedWorkout = await WorkoutModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!updatedWorkout) {
            res.status(404).json({ message: "Workout was not found" });
            return;
        }

        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ message: "Faild to update workout", error });
    }
});

workoutRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid workout id format" });
        return;
    }

    try {
        const deletedWorkout = await WorkoutModel.findByIdAndDelete(id);
        
        if (!deletedWorkout) {
            res.status(404).json({ message: "Workout was not found" });
            return;
        }

        res.json({ message: "Workout deleted successfully", deletedWorkout });
    } catch (error) {
        res.status(500).json({ message: "Faild to delete workout", error });
    }
});

