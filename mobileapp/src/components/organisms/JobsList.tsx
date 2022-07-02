import React from "react";
import { FlatList } from "react-native";
import type { Job } from "../../models/job";
import Spacer from "../atoms/Spacer";
import MissionCard from "../molecules/JobCard";

type JobsListProps = {
  data: Job[] | undefined;
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
