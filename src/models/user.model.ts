import { Schema, model } from "mongoose";

export interface User { 
    _id?: string;
    cookieId?: string;
    username: string;
    password?: string;
    email?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const UserSchema: Schema<User> = new Schema({
    cookieId: { type: String, unigue: true },
    username: { type: String, required: true, unigue: true },
    password: { type: String },
    email:{ type: String },
    name: { type: String },
}, { timestamps: true });

export const UserModel = model("User", UserSchema);