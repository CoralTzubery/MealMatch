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
    cookieId: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email:{ type: String },
    name: { type: String },
}, { timestamps: true });

export const UserModel = model<User>("User", UserSchema);