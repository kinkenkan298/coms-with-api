import { z, ZodError } from "zod";
import { asyncHandler } from "./async-handler";

export const validate = <T extends z.ZodType>(schema: T) => {
  return asyncHandler<z.infer<T>>(async (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ZodError(result.error.issues);
    }
    req.body = result.data;
    next();
  });
};
