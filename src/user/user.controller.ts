import { Request, Response } from "express";
import userUtil from "./user.util";
import userService from "./user.service";
import User from "./user.model";
import Auth from "../auth/auth.model";
import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import CustomResponse from "../util/response";

// Import custom errors
import NotFoundError from "../error/error.classes/NotFoundError";
import BadRequestError from "../error/error.classes/BadRequestError";

const RegisterUser = async (req: Request, res: Response) => {
  const body: any = req.body;
  const user: any = new User(body);

  //check if user already exists
  const existingUser = await userService.findByEmail(user.email, null);

  if (existingUser) {
    throw new BadRequestError("User already exists!");
  }

  //construct auth object
  const auth = new Auth();
  auth._id = user.email;
  auth.password = await userUtil.hashPassword(body.password);
  auth.user = user._id;

  let createdUser = null;

  //start mongoose session
  const session = await startSession();

  try {
    //start transaction in session
    session.startTransaction();

    //save user
    createdUser = await userService.save(user, session);

    //save auth
    await userService.save(auth, session);

    //commit transaction
    await session.commitTransaction();
  } catch (e) {
    //abort transaction
    await session.abortTransaction();
    console.log(e);
    throw e;
  } finally {
    //end session
    session.endSession();
  }

  return CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "User registered successfully!",
    createdUser
  );
};

export { RegisterUser };
