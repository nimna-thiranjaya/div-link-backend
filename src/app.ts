import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./common/common.config";
import errorHandlerMiddleware from "./error/error.middleware";
import "express-async-errors";
import NotFoundError from "./error/error.classes/NotFoundError";
import constants from "./constant";

const app: Express = express();

dotenv.config();
app.use(cors());
app.use(express.json());

//import routes
import UserRouter from "./user/user.route";
import AuthRouter from "./auth/auth.route";
import OrganizationRouter from "./organization/organization.route";
import AppointmentRouter from "./appointment/appointment.route";
import NewsRouter from "./news/news.route";
import CategoryRouter from "./category/category.route";

//define routes
app.use(constants.API.PREFIX.concat("/user"), UserRouter);
app.use(constants.API.PREFIX.concat("/auth"), AuthRouter);
app.use(constants.API.PREFIX.concat("/organization"), OrganizationRouter);
app.use(constants.API.PREFIX.concat("/appointment"), AppointmentRouter);
app.use(constants.API.PREFIX.concat("/news"), NewsRouter);
app.use(constants.API.PREFIX.concat("/category"), CategoryRouter);

//error handler middleware
app.use(errorHandlerMiddleware);

//404 not found route
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError("API endpoint not found!");
});

const start = async () => {
  const port = process.env.PORT || 5000;
  try {
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}..!`);
      connectDB();
    });
  } catch (e) {
    console.log(e);
  }
};

start();
