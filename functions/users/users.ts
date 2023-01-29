import serverless from "serverless-http";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import passport from 'passport';
import mongoose from "mongoose";
import dotenv from "dotenv";
// import http from 'http';
// import { Server } from 'socket.io';
// import { fileURLToPath } from 'url';
import { passportConfig } from './config/passport.js';
import { router } from "./routes/routes.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const port = Number(process.env.PORT) || 7777;

// const httpServer = new http.Server(app);
// const io = new Server(httpServer, { cors: { origin: '*' } });

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL as string)
  .then(() => console.log(`Connected to database ${process.env.DB_URL}`))
  .catch((err: Error) => console.log(`Database error: ${err}`));

// Settings
app.use(cors());
app.options("/*", (_, res) => res.sendStatus(200));
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, HEAD, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET as string,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// Info
app.listen(port, () => console.log(`Server running on port ${port}`));

// Routes
app.use("/.netlify/functions/users", router); // path must route to lambda
app.get("/", (_, res) => res.send("Invalid endpoint"));

module.exports = app;
module.exports.handler = serverless(app);
