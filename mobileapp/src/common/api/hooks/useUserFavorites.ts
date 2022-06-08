import { useQuery } from "react-query";
import { Favorite } from "../../../models/favorite";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import getUserFavorites from "../requests/getUserFavorites";

export default function useUserFavorites(userId: string) {
  const { data, isLoading, error } = useQuery<PaginatedDataType<Favorite>>(
    "getUserFavorites",
    async () => await getUserFavorites(userId)
  );

  return { userFavorites: data?.data, isLoading, error };
}
