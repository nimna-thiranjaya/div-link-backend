import { Request, Response } from "express";
import organizationService from "./organization.service";
import { StatusCodes } from "http-status-codes";
import CustomResponse from "../util/response";

const GetAllOrganizations = async (req: Request, res: Response) => {
  const organizations = await organizationService.findAll(null);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Organizations fetched successfully!",
    organizations
  );
};

export { GetAllOrganizations };
