import { Schema, model, Types } from "mongoose";

export interface User { 
    _id?: string;
    username: string;
    password?: string;
    email?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;

}

// const UserSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     userType: { type: String, enum: ["cook", "trainee"], required: true },
//     cookieId: String,
// }, { timestamps: true });

// export const Listing = model("Post", schema);

