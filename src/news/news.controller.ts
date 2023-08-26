import { Request, Response } from "express";
import { startSession } from "mongoose";
import { StatusCodes } from "http-status-codes";

import News from "./news.model";
import commonService from "../common/common.service";
import CustomResponse from "../util/response";
import newsService from "./news.service";

import NotFoundError from "../error/error.classes/NotFoundError";
import BadRequestError from "../error/error.classes/BadRequestError";
import constants from "../constant";

const CreateNews = async (req: Request, res: Response) => {
  let body: any = req.body;
  let file: any = req.file;
  let auth: any = req.auth;

  if (!file) {
    throw new BadRequestError("News image is required!");
  }

  //construct news object
  const newNews: any = new News(body);
  newNews.addedBy = auth._id;

  //start mongoose session
  const session = await startSession();

  let createdNews = null;
  try {
    //start transaction in session
    session.startTransaction();

    //upload image to cloudinary
    let uploadedObj: any = null;
    if (file) {
      uploadedObj = await commonService.uploadImageAndGetUri(file, "news");
    }

    if (uploadedObj != null) {
      newNews.newsImage = uploadedObj;
    }

    //save news
    createdNews = await newsService.save(newNews, session);

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }

  CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "News created successfully!",
    createdNews
  );
};

const GetAllActiveNews = async (req: Request, res: Response) => {
  let auth = req.auth;

  let activeNews: any[] = [];
  if (auth.role === constants.USER.ROLES.USER) {
    activeNews = await newsService.findAllActiveNews();
  } else if (auth.role === constants.USER.ROLES.ADMIN) {
    activeNews = await newsService.findAllActiveNewsByAddedUser(auth._id);
  }

  CustomResponse(res, true, StatusCodes.OK, "", activeNews);
};

const DeleteNews = async (req: Request, res: Response) => {
  let newsId = req.params.id;

  let news = await newsService.findById(newsId);

  if (news) {
    news.status = constants.WELLKNOWNSTATUS.DELETED;
    await news.save();

    CustomResponse(res, true, StatusCodes.OK, "News deleted successfully!", {});
  } else {
    throw new NotFoundError("News not found!");
  }
};

const UpdateNews = async (req: Request, res: Response) => {
  let newsId: string = req.params.id;
  let auth: any = req.auth;
  let body: any = req.body;
  let file: any = req.file;

  let news: any = await newsService.findById(newsId);

  if (!news) throw new NotFoundError("News not found!");

  //construct news update object expect image and
  for (let key in body) {
    if (key !== "newsImage" && key !== "addedBy") {
      news[key] = body[key];
    }
  }

  console.log(news);
  //start mongoose session
  const session = await startSession();
  let updatedNews = null;

  try {
    //start transaction in session
    session.startTransaction();

    //upload image to cloudinary
    // let uploadedObj: any = null;
    // if (file) {
    //   uploadedObj = await commonService.uploadImageAndGetUri(file, "news");

    //   //delete old image from cloudinary
    //   if (news.newsImage.public_id) {
    //     await commonService.deleteImageByUri(news.newsImage.public_id);
    //   }

    //   news.newsImage = uploadedObj;
    // }

    // //save news
    // updatedNews = await newsService.save(news, session);

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
    StatusCodes.OK,
    "News updated successfully!",
    updatedNews
  );
};

export { CreateNews, GetAllActiveNews, DeleteNews, UpdateNews };
