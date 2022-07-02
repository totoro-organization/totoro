import { useQuery } from "react-query";
import type { Job } from "../../../models/job";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getUserJobs from "../requests/getUserJobs";

export default function useUserJobs(userId: string) {
  const { data, isLoading, error } = useQuery<PaginatedDataType<Job>>(
    "getUserJobs",
    async () => await getUserJobs(userId)
  );

  return { userJobs: data?.data, isLoading, error };
}
