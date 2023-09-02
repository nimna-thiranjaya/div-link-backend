import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

import { PublishJob, GetAllJobs, UpdateJob, DeleteJob } from "./job.controller";

const JobRouter = Router();

JobRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  PublishJob
);

JobRouter.get(
  "/allJobs",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetAllJobs
);

JobRouter.patch(
  "/update/:jobId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  UpdateJob
);

JobRouter.put(
  "/delete/:jobId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteJob
);
export default JobRouter;
