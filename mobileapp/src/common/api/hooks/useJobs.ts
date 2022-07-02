import { useQuery } from "react-query";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getJobs from "../requests/getJobs";

export default function useJobs() {
  const { data, isLoading, error } = useQuery<PaginatedDataType<any>>(
    "getJobs",
    async () => await getJobs()
  );

  return { jobs: data?.data, isLoading, error };
}
