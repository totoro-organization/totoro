import React from "react";
import { View } from "react-native";
import Spinner from "../components/atoms/Spinner";
import { Text } from "../components/atoms/Text";

export default function Loading() {
  return (
    <View>
      <Text>Loading</Text>
      <Spinner />
    </View>
  );
}
