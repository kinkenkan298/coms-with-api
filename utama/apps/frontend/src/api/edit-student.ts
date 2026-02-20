import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { ApiResponse } from "@/types/api-response";
import { StudentSchema } from "@/types/student-type";
import { useMutation } from "@tanstack/react-query";
import { getStudentQueryKey } from "./get-student";
import { toast } from "sonner";
import { AxiosError } from "axios";

const editStudent = async (params: { student: StudentSchema; nis: number }) => {
  const { student, nis } = params;
  const { data } = await axiosInstance.put<ApiResponse<StudentSchema>>(
    "/students/" + nis,
    student,
  );
  return data;
};

type EditStudentParams = {
  mutationConfig?: MutationConfig<typeof editStudent>;
};
export const useEditStudent = (params: EditStudentParams = {}) =>
  useMutation({
    mutationFn: editStudent,
    ...params.mutationConfig,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: getStudentQueryKey() });

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
