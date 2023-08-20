import { Router } from "express";
import { RegisterUser } from "./user.controller";

const UserRouter = Router();

UserRouter.post("/register", RegisterUser);

export default UserRouter;
