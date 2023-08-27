import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";
import { CreateCategory } from "./category.controller";

const CategoryRouter = Router();

CategoryRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  CreateCategory
);

export default CategoryRouter;
