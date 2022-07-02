import { useQuery } from "react-query";
import type { Job } from "../../../models/job";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getJobs from "../requests/getJobs";

export default function useJobs() {
  const { data, isLoading, error } = useQuery<PaginatedDataType<Job>>(
    "getJobs",
    async () => await getJobs()
  );

  return { jobs: data?.data, isLoading, error };
}
