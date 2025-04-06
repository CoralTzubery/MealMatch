import { Schema, model } from "mongoose";

export interface Meal {
    _id?: string;
    userId: string;
    name: string;
    category: "before workout" | "after workout" | "recovery" | "morning" | "other";
    ingredients: string[];
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const MealSchema: Schema<Meal> = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, enum: ["before workout", "after workout", "recovery", "morning", "other"], required: true },
    ingredients: { type: [String], required: true },
    description: { type: String },
}, { timestamps: true });

export const MealModel = model("Meal", MealSchema);
