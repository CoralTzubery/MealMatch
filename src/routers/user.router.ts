import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.get("/", (_req: Request, res: Response) => {
    res.json( { message: "User router is working" });
});

export default userRouter;