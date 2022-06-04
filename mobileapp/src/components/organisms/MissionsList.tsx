import React from "react";
import { FlatList } from "react-native";
import { FAKE_MISSIONS_DATA } from "../../common/mockedData";
import MissionCard from "../molecules/MissionCard";

export default function MissionsList() {
  // TODO: Add this hook.
  // const { missions } = useMissions();

  return (
    <FlatList
      data={FAKE_MISSIONS_DATA}
      style={{ flex: 1 }}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item, index }) => {
        return <MissionCard key={index} mission={item} />;
      }}
    />
  );
}
