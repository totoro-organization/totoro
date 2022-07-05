import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import Filter from "../assets/icons/Filter";
import Sort from "../assets/icons/Sort";
import useJobs from "../common/api/hooks/useJobs";
import useBoolean from "../common/hooks/useBoolean";
import Box from "../components/atoms/Box";
import Button from "../components/atoms/Button";
import Modal from "../components/atoms/Modal";
import Spacer from "../components/atoms/Spacer";
import Spinner from "../components/atoms/Spinner";
import { Text } from "../components/atoms/Text";

import GlobalLayout from "../components/layouts/GlobalLayout";
import JobsList from "../components/organisms/JobsList";
import { AppParamList } from "../navigation/StackNavigationParams";
import theme from "../theme/theme";

export default function Jobs() {
  const navigation = useNavigation<StackNavigationProp<AppParamList>>();
  const { jobs, isLoading: loadingJobs } = useJobs();

  const [showSortByModal, setShowSortByModal] = useBoolean();

  return (
    <GlobalLayout>
      <Box width="100%" alignItems="center" justifyContent="center">
        <Button
          Icon={<Sort />}
          color="grey"
          variant="outline"
          handlePress={setShowSortByModal.on}
        >
          Trier
        </Button>

        <Spacer axis="horizontal" size={0.5} />

        <Button
          Icon={<Filter />}
          color="grey"
          variant="outline"
          handlePress={() => navigation.navigate("JobsFilter")}
        >
          Filtrer
        </Button>
      </Box>

      {showSortByModal && (
        // TODO: Add this code on dedicated organism file.
        <Modal center={false} onCloseModal={setShowSortByModal.off}>
          <Text weight="semiBold">Trier par</Text>
        </Modal>
      )}

      <Spacer axis="vertical" size={2} />

      {loadingJobs && (
        <ActivityIndicator color={theme.colors.brand.primary.base} />
      )}
      {!loadingJobs && <JobsList data={jobs} />}
    </GlobalLayout>
  );
}
