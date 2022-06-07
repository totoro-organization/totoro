import { useQuery } from "react-query";
import { Favorite } from "../../../models/favorite";
import PaginatedDataType from "../interfaces/PaginatedDataType";
import fetchConnectedUser from "../requests/auth/fetchConnectedUser";
import getUserFavorites from "../requests/getUserFavorites";

export default function useUserConnected() {
  const { data, isLoading, error } = useQuery(
    "getUserConnected",
    async () => await fetchConnectedUser()
  );

  return { userConnected: data, isLoading, error };
}
