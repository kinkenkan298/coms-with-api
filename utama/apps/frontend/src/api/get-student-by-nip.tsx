import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { ApiResponse } from "@/types/api-response";
import { StudentSchema } from "@/types/student-type";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getStudentByNis = async (nis: number) => {
  const { data } = await axiosInstance.get<ApiResponse<StudentSchema>>(
    "/students/" + nis,
  );
  return data;
};
export const getStudentByNisQueryKey = (nis: number) => ["student", nis];
export const getStudentByNisQueryOptions = (nis: number) =>
  queryOptions({
    queryKey: getStudentByNisQueryKey(nis),
    queryFn: () => getStudentByNis(nis),
  });
type GetStudentByNisParams = {
  nis: number;
  queryConfig?: QueryConfig<typeof getStudentByNisQueryOptions>;
};
export const useGetStudentByNis = (params: GetStudentByNisParams) =>
  useQuery({
    ...getStudentByNisQueryOptions(params.nis),
    ...params.queryConfig,
  });
