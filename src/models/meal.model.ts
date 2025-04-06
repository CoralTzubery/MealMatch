export interface Meal {
    _id?: string;
    userId: string;
    name: string;
    category: "before workout" | "after workout" | "recovery" | "morning" | "other";
    ingredients: string [];
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}