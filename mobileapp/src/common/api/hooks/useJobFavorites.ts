import { useQuery } from "react-query";
import type { JobFavorite } from "../../../models/job";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getJobFavorites from "../requests/job/getJobFavorites";

export default function useJobFavorites(jobId: string) {
  const { data, isLoading, error } = useQuery<PaginatedDataType<JobFavorite>>(
    "getJobFavorites",
    async () => await getJobFavorites(jobId)
  );

  return { jobFavorites: data?.data, isLoading, error, total: data?.totalRows };
}
