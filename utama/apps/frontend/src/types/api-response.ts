import { StudentSchema } from "./student-type";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface StudentReponse extends StudentSchema {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export type StudentApiResponse = ApiResponse<StudentReponse[]>;
