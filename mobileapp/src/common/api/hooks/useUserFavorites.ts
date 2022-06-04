import { useQuery } from "react-query";
import { Favorite } from "../../../models/favorite";
import getUserFavorites from "../requests/getUserFavorites";

export default function useUserFavorites(userId: string) {
  const { data, isLoading, error } = useQuery<Favorite[]>(
    "getUserFavorites",
    async () => await getUserFavorites(userId)
  );

  return { userFavorites: data, isLoading, error };
}
