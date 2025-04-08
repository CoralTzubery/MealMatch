import path from "path";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./routers/user.router";
import { mealRouter } from "./routers/meal.router";
import { workoutRouter } from "./routers/workout.router";
import { matchRouter } from "./routers/match.router";
import { authRouter } from "./routers/auth.router";

export const app = express();

app.use(json());
app.use(cookieParser());
app.use("/api", authRouter);


app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);
app.use("/api/workouts", workoutRouter);
app.use("/api/matches", matchRouter);