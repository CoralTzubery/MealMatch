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

app.use(cookieParser());
app.use(json());
  
app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);
app.use("/api/workouts", workoutRouter);
app.use("/api/matches", matchRouter);
app.use("/api/login", authRouter);

app.use(express.static("public"));

app.use((_req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});
