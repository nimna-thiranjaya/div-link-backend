import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import categoryService from "./category.service";
import Category from "./category.model";
import CustomResponse from "../util/response";

const CreateCategory = async (req: Request, res: Response) => {
  let body = req.body;

  const newCategory = new Category(body);

  let createdCategory = null;
  try {
    createdCategory = await categoryService.save(newCategory, null);

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Category created successfully!",
      createdCategory
    );
  } catch (e) {
    throw e;
  }
};

export { CreateCategory };
