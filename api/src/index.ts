import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import userRouter from "./router";

const app = express();

const port = process.env.PORT || 8001;
const BASE_URL = process.env.BASE_URL;

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//prevent from going dormant on render.com free tier
function wakeServer(interval: number) {
  setInterval(async () => {
    try {
      await fetch(BASE_URL + "/check");
    } catch (err) {
      console.log(err);
    }
  }, interval);
}

wakeServer(14 * 60 * 1000);

app.get("/check", (req: Request, res: Response) => {
  return res.send("OK");
});

app.use("/api/v1/users", userRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "route not found" });
});

async function start() {
  await mongoose
    .connect(process.env.DB_URI || "mongodb://localhost:27017/yip")
    .then((_) => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("db error occured", err);
    });
  const server = http.createServer(app);
  server.listen(port);
  server.on("listening", () => {
    console.log(
      `server running ${process.env.NODE_ENV} mode on port ${
        (server.address() as { port: number }).port
      }`
    );
  });
  return server;
}

start();
