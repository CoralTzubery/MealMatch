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