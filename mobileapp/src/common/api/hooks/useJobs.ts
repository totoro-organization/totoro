import { useQuery } from "react-query";
import type { Job } from "../../../models/job";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getJobs from "../requests/job/getJobs";

export default function useJobs(parameters: {
  longitude: number;
  latitude: number;
}) {
  const { data, isLoading, error } = useQuery<PaginatedDataType<Job>>(
    "getJobs",
    async () => await getJobs(parameters)
  );

  return { jobs: data?.data, isLoading, error };
}
