import { useQuery } from "react-query";
import type { Job } from "../../../models/job";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getUserJobs from "../requests/job/getUserJobs";

export default function useUserJobs(userId: string) {
  // FIXME: add type
  const { data, isLoading, error } = useQuery<PaginatedDataType<any>>(
    "getUserJobs",
    async () => await getUserJobs(userId)
  );

  return { userJobs: data?.data, isLoading, error };
}
