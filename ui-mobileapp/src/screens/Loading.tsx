import React from "react";
import { View, Text } from "react-native";
import Spinner from "../components/atoms/Spinner";

export default function Loading() {
  return (
    <View>
      <Text>Loading</Text>
      <Spinner />
    </View>
  );
}
