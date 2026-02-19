import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { ApiResponse } from "@/types/api-response";
import { StudentSchema } from "@/types/student-type";
import { useMutation } from "@tanstack/react-query";
import { getStudentQueryKey } from "./get-student";
import { toast } from "sonner";
import { AxiosError } from "axios";

const createStudent = async (student: StudentSchema) => {
  const { data } = await axiosInstance.post<ApiResponse<StudentSchema>>(
    "/students",
    {
      ...student,
      nis: Number(student.nis),
    },
  );
  return data;
};

type CreateStudentParams = {
  mutationConfig?: MutationConfig<typeof createStudent>;
};
export const useCreateStudent = (params: CreateStudentParams = {}) =>
  useMutation({
    mutationFn: createStudent,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getStudentQueryKey() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
    onError: (
      err: AxiosError<ApiResponse<{ field: string; message: string }[] | null>>,
    ) => {
      if (err.response?.data.data) {
        err.response?.data.data.map((e) => {
          toast.error(e.message);
        });
      }
      toast.error(err.response?.data.message);
    },
  });
