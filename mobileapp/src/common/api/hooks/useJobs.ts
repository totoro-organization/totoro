import { useQuery } from "react-query";
import type { Job } from "../../../models/job";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getJobs, { JobsRequestParameters } from "../requests/job/getJobs";

export default function useJobs({
  longitude,
  latitude,
}: JobsRequestParameters) {
  const { data, isLoading, error } = useQuery<PaginatedDataType<Job>>(
    "getJobs",
    async () => await getJobs({ longitude, latitude })
  );

  return { jobs: data?.data, isLoading, error };
}
