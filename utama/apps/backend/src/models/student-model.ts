import { GenderEnum, StudentSchema } from "@/types/student-type";
import { Document, model, Schema } from "mongoose";

interface StudentSchemaDocument extends StudentSchema, Document {}

const studentSchema = new Schema<StudentSchemaDocument>(
  {
    nis: {
      type: Number,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    kelas: {
      type: String,
      required: true,
    },
    umur: {
      type: Number,
      required: true,
    },
    jenis_kelamin: {
      type: String,
      required: true,
      enum: GenderEnum,
    },
    no_telp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export const StudentModel = model<StudentSchema>("students", studentSchema);
