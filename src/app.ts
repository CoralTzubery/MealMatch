import path from "path";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "./routers/api";
import { userRouter } from "./routers/user.router";
import { mealRouter } from "./routers/meal.router";
import { workoutRouter } from "./routers/workout.router";
import { matchRouter } from "./routers/match.router";

export const app = express();

app.use(json());
app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);
app.use("/api/workouts", workoutRouter);
app.use("/api/matches", matchRouter);

// export const app = express();


// app.use((req, _, next) => {
//     console.log(new Date(), req.method, req.url);
//     next();
// });

// app.use(json());
// app.use(cookieParser(process.env.SESSION_SECRET));

// app.use("/api", apiRouter);
// app.use(express.static(path.resolve(__dirname, "..", "public")));
// app.use((_, res) => {
//     res.redirect("404.html");
// });
