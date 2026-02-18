import { asyncHandler } from "@/middleware/async-handler";
import { successResponse } from "@/utils/api-response";
import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";

const apiRoutes: Router = Router();

apiRoutes.get(
  "/health",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    successResponse({
      res,
      message: "API is healthy",
      data: null,
    });
  }),
);
export { apiRoutes };
