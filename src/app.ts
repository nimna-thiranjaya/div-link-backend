import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./common/common.config";
import errorHandlerMiddleware from "./error/error.middleware";
import "express-async-errors";
import NotFoundError from "./error/error.classes/NotFoundError";
const app: Express = express();

dotenv.config();
app.use(cors());
app.use(express.json());

//import routes

//define routes

//error handler middleware
app.use(errorHandlerMiddleware);

//not found route
app.use((req: Request, res: Response) => {
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
