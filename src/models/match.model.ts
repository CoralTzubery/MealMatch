import { Schema, model } from "mongoose";
import { Meal } from "./meal.model";
import { Workout } from "./workout.model";

export interface Match {
    _id?: string;
    userId: string;
    meal: string | Meal;
    workout: string | Workout;
    rating?: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const MatchSchema: Schema<Match> = new Schema({
    userId: { type: String, required: true },
    meal: { type: Schema.Types.ObjectId, ref: "Meal", required: true },
    workout: { type: Schema.Types.ObjectId, ref: "Workout", required: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

export const MatchModel = model<Match>("Match", MatchSchema);
