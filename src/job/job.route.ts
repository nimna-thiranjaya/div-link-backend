import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

import { PublishJob } from "./job.controller";

const JobRouter = Router();

JobRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  PublishJob
);

export default JobRouter;
