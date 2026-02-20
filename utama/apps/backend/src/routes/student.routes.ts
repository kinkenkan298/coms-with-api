import { asyncHandler } from "@/middleware/async-handler";
import { validate } from "@/middleware/validate-handler";
import { StudentsService } from "@/services/student.service";
import { GenderEnum, studentSchema, StudentSchema } from "@/types/student-type";
import { successResponse } from "@/utils/api-response";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

const studentRoute: Router = Router();
const nisSchema = z.object({
  nis: z.coerce.number<number>({ error: "NIS tidak valid!" }),
});

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
studentRoute.get(
  "/gender",
  validate(
    z.object({
      gender: z.enum(GenderEnum),
    }),
    "query",
  ),
  asyncHandler<{}, {}, { gender: GenderEnum }, {}>(async (req, res) => {
    const { gender } = req.query;
    const data = await StudentsService.getStudentByGender(gender);

    successResponse({
      res,
      data,
    });
  }),
);
studentRoute.get(
  "/:nis",
  validate(nisSchema, "params"),
  asyncHandler<{}, {}, {}, { nis: number }>(async (req, res) => {
    const data = await StudentsService.getStudentByNis(req.params.nis);
    successResponse({
      res,
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
  validate(nisSchema, "params"),
  validate(studentSchema.partial(), "body"),
  asyncHandler<Partial<StudentSchema>, {}, {}, { nis: number }>(
    async (req, res) => {
      const { nis } = req.params;
      const updatedStudent = await StudentsService.updateStudent(nis, req.body);
      successResponse({
        res,
        data: updatedStudent,
        message: "Berhasil mengubah siswa",
        statusCode: 200,
      });
    },
  ),
);
studentRoute.delete(
  "/:nis",
  validate(nisSchema, "params"),
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
