import React from "react";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import { Text } from "../../components/atoms/Text";
import { StackParamList } from "../../navigation/StackNavigationParams";
import { StackScreenProps } from "@react-navigation/stack";

export default function Discount({
  route,
}: StackScreenProps<StackParamList, "Discount">) {
  return (
    <GlobalLayout>
      <Text>""</Text>
    </GlobalLayout>
  );
}
