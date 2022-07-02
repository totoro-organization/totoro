import { useQuery } from "react-query";
import type { Job } from "../../../models/job";

import getJob from "../requests/getJob";

export default function useJob(jobId: string) {
  const { data, isLoading, error } = useQuery<Job>(
    "getJob",
    async () => await getJob(jobId)
  );

  return { job: data, isLoading, error };
}
