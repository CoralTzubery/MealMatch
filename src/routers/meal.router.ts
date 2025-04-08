import { Router, Request, Response } from "express";
import { MealModel } from "../models/meal.model";
import { Types } from "mongoose";
import { requireUser } from "../middleware/auth.middleware";

export const mealRouter = Router();

mealRouter.get("/", requireUser, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const meals = await MealModel.find({ userId: req.user._id });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch meals", error });
    }
});

mealRouter.post("/", requireUser, async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const newMeal = new MealModel({ ...req.body, userId: req.user._id });
        const saveMeal = await newMeal.save();
        res.status(201).json(saveMeal);
    } catch (error) {
        res.status(400).json({ message: "Failed to create a meal", error });
    }
});

mealRouter.get("/:id", requireUser, async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid meal id format" });
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const meal = await MealModel.findOne({ _id: id, userId: req.user._id });

        if (!meal) {
            res.status(404).json({ message: "Meal was not found" });
        }

        res.json(meal);
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch meal", error });
    }
});

mealRouter.put("/:id", requireUser, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid meal id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const updatedMeal = await MealModel.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body, { new: true, runValidators: true });
        
        if (!updatedMeal) {
            res.status(404).json({ message: "Meal was not found" });
            return;
        }

        res.json(updatedMeal);
    } catch (error) {
        res.status(500).json({ message: "Faild to update meal", error });
    }
});

mealRouter.delete("/:id", requireUser, async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid user id format" });
        return;
    }

    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const deletedMeal = await MealModel.findOneAndDelete({ _id: id, userId: req.user._id });
        
        if (!deletedMeal) {
            res.status(404).json({ message: "Meal was not found" });
            return;
        }

        res.json({ message: "Meal deleted successfully", deletedMeal });
    } catch (error) {
        res.status(500).json({ message: "Faild to delete meal", error });
    }
});

