import React from "react";
import { FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { Job } from "../../models/job";
import Spacer from "../atoms/Spacer";
import MissionCard from "../molecules/JobCard";

type JobsListProps = {
  data: Job[] | undefined;
};

export default function JobsList({ data }: JobsListProps) {
  return (
    <ScrollView>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => {
          return (
            <View key={`${item.id}`}>
              <MissionCard key={index} job={item} />
              <Spacer axis="vertical" size={1} />
            </View>
          );
        }}
      />
    </ScrollView>
  );
}
