import { Router } from "express";
import { CreateNews, GetAllActiveNewsForUser } from "./news.controller";
import authMiddleware from "../auth/auth.middleware";
import commonMiddleware from "../common/common.middleware";
import constants from "../constant";

const NewsRouter = Router();

NewsRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  commonMiddleware.multerUploader.single("newsImage"),
  CreateNews
);

NewsRouter.get("/getAllActiveNews", GetAllActiveNewsForUser);

export default NewsRouter;
