import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";
import { CreateCategory } from "./helper.controller";

const HelperRouter = Router();

HelperRouter.post(
  "/category/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  CreateCategory
);

export default HelperRouter;
