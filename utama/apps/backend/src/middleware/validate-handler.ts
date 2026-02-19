import { z, ZodError } from "zod";
import { asyncHandler } from "./async-handler";

type ValidateTarget = "body" | "params" | "query";
export const validate = <T extends z.ZodType>(
  schema: T,
  target: ValidateTarget = "body",
) => {
  return asyncHandler<z.infer<T>>(async (req, res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      throw new ZodError(result.error.issues);
    }
    req[target] = result.data;
    next();
  });
};
