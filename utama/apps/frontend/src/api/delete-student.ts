import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { getStudentQueryKey } from "./get-student";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api-response";

const deleteStudent = async (nis: number) => {
  const { data } = await axiosInstance.delete(`/students/${nis}`);
  return data;
};
type DeleteStudentParams = {
  mutationConfig?: MutationConfig<typeof deleteStudent>;
};
export const useDeleteStudent = (params: DeleteStudentParams = {}) =>
  useMutation({
    mutationFn: deleteStudent,
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
