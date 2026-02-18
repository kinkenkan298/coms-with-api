import { asyncHandler } from "@/middleware/async-handler";
import { validate } from "@/middleware/validate-handler";
import { StudentsService } from "@/services/student.service";
import { studentSchema, StudentSchema } from "@/types/student-type";
import { successResponse } from "@/utils/api-response";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const studentRoute: Router = Router();

studentRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await StudentsService.getAllStudents();
    successResponse({
      res,
      message: "Berhasil mendapatkan data siswa",
      data,
    });
  }),
);
studentRoute.post(
  "/",
  validate(studentSchema),
  asyncHandler(async (req, res) => {
    const data = await StudentsService.createStudent(req.body);

    successResponse({
      res,
      data,
      statusCode: StatusCodes.CREATED,
    });
  }),
);
export { studentRoute };
