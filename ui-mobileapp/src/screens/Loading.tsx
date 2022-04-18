import React from "react";
import { View } from "react-native";
import Spinner from "../components/atoms/Spinner";

export default function Loading() {
  return (
    <View>
      Loading
      <Spinner />
    </View>
  );
}
