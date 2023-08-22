import { Router } from "express";
import {
  GetAllOrganizations,
  GetOrganizationById,
} from "./organization.controller";

const OrganizationRouter = Router();

OrganizationRouter.get("/getAll", GetAllOrganizations);
OrganizationRouter.get("/getOrg/:id", GetOrganizationById);

export default OrganizationRouter;
