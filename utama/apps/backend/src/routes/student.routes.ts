import { asyncHandler } from "@/middleware/async-handler";
import { validate } from "@/middleware/validate-handler";
import { StudentsService } from "@/services/student.service";
import { studentSchema, StudentSchema } from "@/types/student-type";
import { successResponse } from "@/utils/api-response";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { success, z } from "zod";

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
  asyncHandler<StudentSchema>(async (req, res) => {
    const data = await StudentsService.createStudent(req.body);

    successResponse({
      res,
      data,
      statusCode: StatusCodes.CREATED,
    });
  }),
);
studentRoute.put(
  "/:nis",
  validate(
    z.object({
      nis: z.coerce.number<number>({ error: "NIS tidak valid!" }),
    }),
    "params",
  ),
  validate(studentSchema.partial(), "body"),
  asyncHandler<Partial<StudentSchema>, {}, {}, { nis: number }>(
    async (req, res) => {
      const { nis } = req.params;
      const updatedStudent = await StudentsService.updateStudent(nis, req.body);
      successResponse({
        res,
        data: updatedStudent,
        message: "Teacher updated successfully",
        statusCode: 200,
      });
    },
  ),
);
studentRoute.delete(
  "/:nis",
  validate(
    z.object({
      nis: z.coerce.number<number>({ error: "NIS tidak valid!" }),
    }),
    "params",
  ),
  asyncHandler<{}, {}, {}, { nis: number }>(async (req, res) => {
    const { nis } = req.params;
    const student = await StudentsService.deleteStudent(nis);
    successResponse({
      res,
      message: "Berhasil menghapus siswa!",
      data: student,
    });
  }),
);
export { studentRoute };
