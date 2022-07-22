import React from "react";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import { Text } from "../../components/atoms/Text";
import { StackParamList } from "../../navigation/StackNavigationParams";
import { StackScreenProps } from "@react-navigation/stack";
import useDiscount from "../../common/api/hooks/useDiscount";

export default function Discount({
  route,
}: StackScreenProps<StackParamList, "Discount">) {
  const discountId = route.params.id;
  const { discount } = useDiscount(discountId);

  return (
    <GlobalLayout>
      <Text>{discount?.partner.name}</Text>
    </GlobalLayout>
  );
}
