import { StudentModel } from "@/models/student-model";
import { StudentSchema } from "@/types/student-type";
import { HttpException } from "@/utils/http-exception";
import { StatusCodes } from "http-status-codes";
import { logger } from "logger";
import { DeleteResult } from "mongoose";

class StudentsService {
  static async getAllStudents(): Promise<StudentSchema[]> {
    logger.info("Get all students");
    try {
      const students = await StudentModel.find().sort({ createdAt: -1 });
      return students;
    } catch {
      logger.error("Failed to get all students");
      throw new HttpException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Gagal mendapatkan semua siswa",
      );
    }
  }
  static async createStudent(student: StudentSchema): Promise<StudentSchema> {
    logger.info("Creating Student");
    try {
      const existsStudent = await StudentModel.findOne({ nis: student.nis });
      if (existsStudent) {
        logger.warn("Data siswa sudah ada!");
        throw new HttpException(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Data siswa sudah ada!",
        );
      }

      const newStudent = await StudentModel.create({
        ...student,
      });
      return newStudent;
    } catch (error) {
      logger.error("Terjadi kesalahan dalam membuat siswa");
      throw error;
    }
  }
  static async updateStudent(
    nis: number,
    student: Partial<StudentSchema>,
  ): Promise<StudentSchema | null> {
    logger.info("Update student nis: " + nis);
    const updateStudent = await StudentModel.findOneAndUpdate(
      { nis },
      student,
      { runValidators: true, returnDocument: "after" },
    );
    return updateStudent;
  }
  static async deleteStudent(nis: number): Promise<DeleteResult> {
    try {
      const existsStudent = await StudentModel.findOne({ nis });
      if (!existsStudent) {
        logger.warn("Data NIS : " + nis + " tidak ditemukan");
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          "Data siswa yang ingin dihapus tidak ada!",
        );
      }
      return await existsStudent.deleteOne();
    } catch (error) {
      logger.error("Error");
      throw error;
    }
  }
}

export { StudentsService };
