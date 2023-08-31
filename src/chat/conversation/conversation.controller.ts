import { Request, Response } from "express";
import { startSession } from "mongoose";
import { StatusCodes } from "http-status-codes";

import conversation from "./conversation.model";
import conversationService from "./conversation.service";
import userService from "../../user/user.service";
import CustomResponse from "../../util/response";

import NotFoundError from "../../error/error.classes/NotFoundError";
import BadRequestError from "../../error/error.classes/BadRequestError";

const CreateConversation = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const body: any = req.body;

  const member: any = await userService.findById(body.memberTwo); // validate member

  if (!member) throw new NotFoundError("Member not found!");

  //check if conversation already exists
  const conversationExists: any = await conversationService.findByMembers(
    auth._id,
    body.memberTwo
  );

  if (conversationExists)
    throw new BadRequestError("Conversation already exists!");

  //construct conversation object
  const newConversation: any = new conversation(body);
  newConversation.memberOne = auth._id;
  newConversation.company = member.organization;

  const session = await startSession(); //start mongoose session

  let createdConversation = null;
  try {
    session.startTransaction(); //start transaction in session

    createdConversation = await conversationService.save(
      newConversation,
      session
    ); //save conversation

    await session.commitTransaction();
  } catch (e) {
    session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }

  CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "Conversation created successfully!",
    createdConversation
  );
};

const GetAllConversations = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const conversations: any =
    await conversationService.findConversationsByMember(auth._id);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Conversations fetched successfully!",
    conversations
  );
};

export { CreateConversation, GetAllConversations };
