import { Schema, model } from "mongoose";

export interface Workout {
    _id?: string;
    userId: string;
    name: string;
    category: "strength" | "cardio" | "flexibility" | "other";
    duration?: number;
    intensity?: "low" | "meduim" | "high";
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const WorkoutSchema: Schema<Workout> = new Schema({
    userId: { type: String, required: true }, 
    name: { type: String, required: true },
    category: { type: String, enum: ["strength", "cardio", "flexibility", "other"], required: true },
    duration: { type: Number },
    intensity: { type: String, enum: ["low", "meduim", "high"] },
    description: {type: String }, 
}, { timestamps: true });

export const WorkoutModel = model("Workout", WorkoutSchema);
