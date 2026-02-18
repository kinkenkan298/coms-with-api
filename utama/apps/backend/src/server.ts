import cors from "cors";
import express, { Express } from "express";
import { errorHandler } from "@/middleware/error-handler";
import {
  httpLogger,
  logBodyRequests,
  logQueryParams,
  addRequestId,
} from "@/logger";
import { connectDB } from "@/db";
import helmet from "helmet";
import { apiRoutes } from "./routes/api.routes";
import { StatusCodes } from "http-status-codes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());

app.use([httpLogger, addRequestId, logBodyRequests, logQueryParams]);

await connectDB();
// routes

app.use(apiRoutes)

app.get("/", (req, res) => {
  res.status(StatusCodes.FORBIDDEN).json({
    status: false,
    message: "Halaman ini tidak dapat di akses!"
  })
});

app.use(errorHandler);

export { app };
