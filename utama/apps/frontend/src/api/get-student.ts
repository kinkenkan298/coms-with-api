import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { StudentApiResponse } from "@/types/api-response";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getStudent = async () => {
  const { data } = await axiosInstance.get<StudentApiResponse>("/students");
  if (!data.success) {
    throw new Error("Data siswa gagal diambil");
  }
  return data;
};

export const getStudentQueryKey = () => ["students"];
export const getStudentQueryOption = () =>
  queryOptions({
    queryKey: getStudentQueryKey(),
    queryFn: getStudent,
  });

type GetStudentParams = {
  queryConfig?: QueryConfig<typeof getStudentQueryOption>;
};
export const useGetStudent = (params: GetStudentParams = {}) =>
  useQuery({
    ...getStudentQueryOption(),
    ...params.queryConfig,
  });
