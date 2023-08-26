import { Request, Response } from "express";

const CreateCategory = async (req: Request, res: Response) => {
  let body = req.body;
  console.log(body);
};

export { CreateCategory };
