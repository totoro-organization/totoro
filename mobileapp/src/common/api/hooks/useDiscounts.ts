import { useQuery } from "react-query";
import type { Discount } from "../../../models/discount";
import type PaginatedDataType from "../interfaces/PaginatedDataType";
import getDiscounts from "../requests/discount/getDiscounts";

export default function useDiscounts() {
  const { data, isLoading, error } = useQuery<PaginatedDataType<Discount>>(
    "getDiscounts",
    async () => await getDiscounts()
  );

  return { discounts: data?.data, isLoading, error };
}
