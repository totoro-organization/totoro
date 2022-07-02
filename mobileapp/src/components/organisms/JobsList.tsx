import React from "react";
import { FlatList } from "react-native";
import { FAKE_MISSIONS_DATA } from "../../common/mockedData";
import Spacer from "../atoms/Spacer";
import MissionCard from "../molecules/JobCard";

type JobsListProps = {
  data: any;
};

export default function JobsList({ data }: JobsListProps) {
  return (
    <FlatList
      data={data}
      style={{ flex: 1 }}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item, index }) => {
        return (
          <>
            <MissionCard key={index} job={item} />
            <Spacer axis="vertical" size={1} />
          </>
        );
      }}
    />
  );
}
