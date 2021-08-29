import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyparser from "body-parser";
import UserRouter from "./routers/UserRouter";
import { getEnvironmentVariables } from "./environments/env";

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.connectMongodb();
    this.configureBodyParser();
  }

  connectMongodb() {
    const databaseUrl = getEnvironmentVariables().db_url;
    mongoose
      .connect(databaseUrl)
      .then(() => {
        console.log("db is connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  configureBodyParser() {
    this.app.use(bodyparser.urlencoded({ extended: true }));
  }

  setRoutes() {
    this.app.use("/api/user", UserRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({ message: "Not Found", status_code: 404 });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something Went Wrong. Please Try Again",
        status_code: errorStatus,
      });
    });
  }
}
