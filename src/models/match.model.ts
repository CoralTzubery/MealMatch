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