import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator } from "react-native";
import Filter from "../assets/icons/Filter";
import useJobs from "../common/api/hooks/useJobs";
import useAuth from "../common/hooks/useAuth";
import Button from "../components/atoms/Button";

import Spacer from "../components/atoms/Spacer";

import GlobalLayout from "../components/layouts/GlobalLayout";
import JobsList from "../components/organisms/JobsList";
import { AppParamList } from "../navigation/StackNavigationParams";
import theme from "../theme/theme";

export default function Jobs() {
  const navigation = useNavigation<StackNavigationProp<AppParamList>>();
  const { user } = useAuth();
  const { jobs, isLoading: loadingJobs } = useJobs({
    longitude: user?.longitude || -0.594,
    latitude: user?.latitude || 44.8378,
  });

  return (
    <GlobalLayout>
      <Button
        Icon={<Filter />}
        color="grey"
        variant="outline"
        handlePress={() => navigation.navigate("JobsFilter")}
      >
        Accéder aux filtres
      </Button>

      <Spacer axis="vertical" size={2} />

      {loadingJobs && (
        <ActivityIndicator color={theme.colors.brand.primary.base} />
      )}

      {!loadingJobs && <JobsList data={jobs} />}
    </GlobalLayout>
  );
}
