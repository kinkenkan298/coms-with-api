import { StudentModel } from "@/models/student-model";
import { GenderEnum, StudentSchema } from "@/types/student-type";
import { HttpException } from "@/utils/http-exception";
import { pushToClient } from "@/utils/push-to-client";
import { StatusCodes } from "http-status-codes";
import { logger } from "logger";
import { DeleteResult } from "mongoose";

class StudentsService {
  static async getAllStudents(): Promise<StudentSchema[]> {
    logger.info("Get all students");
    try {
      const students = await StudentModel.find().sort({ nis: 1 });
      return students;
    } catch (error) {
      logger.error("Failed to get all students");
      throw error;
    }
  }
  static async getStudentByNis(nis: number): Promise<StudentSchema> {
    logger.info("Get Student nis : " + nis);
    const student = await StudentModel.findOne({ nis });
    if (!student) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        `Data NIS: ${nis} tidak ditemukan`,
      );
    }
    return student;
  }
  static async getStudentByGender(
    gender: GenderEnum,
  ): Promise<StudentSchema[]> {
    logger.info("Get Student by gender " + gender);
    const data = await StudentModel.find({ jenis_kelamin: gender });
    if (data.length === 0) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        `Data siswa jenis kelamin ${gender} tidak ditemukan!`,
      );
    }
    return data;
  }
  static async createStudent(student: StudentSchema): Promise<StudentSchema> {
    logger.info("Creating Student");
    const existsStudent = await StudentModel.findOne({ nis: student.nis });
    if (existsStudent) {
      logger.warn("Data siswa sudah ada!");
      throw new HttpException(StatusCodes.CONFLICT, "Data siswa sudah ada!");
    }

    const newStudent = await StudentModel.create({
      ...student,
    });

    await pushToClient("CREATE", newStudent);
    return newStudent;
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
    if (!updateStudent) {
      throw new HttpException(
        StatusCodes.BAD_REQUEST,
        `Data NIS: ${nis} tidak ditemukan`,
      );
    }
    await pushToClient("UPDATE", updateStudent);
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
      const data = await existsStudent.deleteOne();
      await pushToClient("DELETE", existsStudent);
      return data;
    } catch (error) {
      logger.error("Error");
      throw error;
    }
  }
}

export { StudentsService };
