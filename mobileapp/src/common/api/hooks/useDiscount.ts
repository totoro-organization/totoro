import { useQuery } from "react-query";
import type { Discount } from "../../../models/discount";

import getDiscount from "../requests/discount/getDiscount";

export default function useDiscount(discountId: string) {
  const { data, isLoading, error } = useQuery<Discount>(
    "getDiscount",
    async () => await getDiscount(discountId)
  );

  return { discount: data, isLoading, error };
}
