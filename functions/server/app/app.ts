import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import http from 'http';
// import { Server } from 'socket.io';
// import { fileURLToPath } from 'url';
import { UserRoutes } from "../routes/userRoutes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

class Server {
  public app: express.Express;
  public port: number = Number(process.env.PORT) || 7777;

  constructor() {
    this.port;
    this.app = express();
    this.config();
    this.routes();
    this.mongoDB();
  }

  public routes(): void {
    this.app.use("/.netlify/functions/server", new UserRoutes().router);
    this.app.get("/", (_, res) => res.send("Invalid endpoint"));
  }

  public config(): void {
    this.app.options("/*", (_, res) => res.sendStatus(200));
    this.app.use(cors());
    this.app.use(function (_, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept",
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, HEAD, OPTIONS",
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
    this.app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET as string,
      }),
    );
    this.app.use(bodyParser.json());
  }

  public mongoDB(): void {
    mongoose.set("strictQuery", true);

    const connection = mongoose.connection;
    const dbUrl = process.env.DB_URL as string;

    connection.on("connected", () =>
      console.log("MongoDB connection established"),
    );

    connection.on("reconnected", () =>
      console.log("MongoDB connection reestablished"),
    );

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected. Trying to reconnect...");
      setTimeout(() => {
        mongoose.connect(dbUrl, {
          // autoReconnect: true,
          keepAlive: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000,
        });
      }, 3000);
    });

    connection.on("close", () => console.log("Mongo connection closed"));

    connection.on("error", (error: Error) =>
      console.log("MongoDB connection error: " + error),
    );

    const run = async () => {
      await mongoose.connect(dbUrl, {
        // autoReconnect: true,
        keepAlive: true,
      });
    };

    run().catch(error => console.error(error));
  }

  public start(): void {
    this.config();
    this.routes();
    this.mongoDB();
    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`),
    );
  }
}

export const app = new Server().app;
