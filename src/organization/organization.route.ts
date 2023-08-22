import { Router } from "express";
import { GetAllOrganizations } from "./organization.controller";

const OrganizationRouter = Router();

OrganizationRouter.get("/get-all", GetAllOrganizations);

export default OrganizationRouter;
