import React from "react";
import styled from "styled-components/native";
import { Heading, Text } from "../../components/atoms/Text";
import GlobalLayout from "../../components/layouts/GlobalLayout";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../../navigation/StackNavigationParams";
import Button from "../../components/atoms/Button";
import { FAKE_MISSIONS } from "../Missions";
import Spacer from "../../components/atoms/Spacer";
import Heart from "../../assets/icons/Heart";
import Box from "../../components/atoms/Box";
import { ImageBackground, ScrollView } from "react-native";
import MissionDetail from "../../components/molecules/MissionDetail";
import Location from "../../assets/icons/Location";
import Calendar from "../../assets/icons/Calendar";
import { Link } from "@react-navigation/native";

export default function Mission({
  route,
}: StackScreenProps<StackParamList, "Mission">) {
  const missionId = route.params.id;

  // TODO: Replace me by the real data.
  const mission = FAKE_MISSIONS[missionId];

  // TODO: Create hook with fetch API to get mission by id.
  //   const { mission } = useMission(missionId);

  return (
    <GlobalLayout
      withHeader={false}
      fullBanner={
        <StyledImage source={{ uri: mission.banner }} resizeMode="cover" />
      }
    >
      {/* TODO: Add Tag atom.*/}
      <Text color="info">{mission.tags[0]}</Text>

      <Spacer axis="vertical" size={1} />

      <Heading variant="h1" weight="regular">
        {mission.title}
      </Heading>

      <Spacer axis="vertical" size={0.5} />

      <Text color="grey">
        <TextLight>Organisé par</TextLight>&nbsp;
        <Link
          to={{
            screen: "Profile",
            params: { id: { missionId }, type: "organization" },
          }}
        >
          {mission.organization}
        </Link>
      </Text>

      <Spacer axis="vertical" size={2} />

      <Box alignItems="center">
        <Button size="sm" color="black" Icon={<Heart color="white" />}>
          Sauvegarder
        </Button>

        <Spacer axis="horizontal" size={0.75} />

        <TextLight size="sm">
          {mission.interestedParticipants} personnes intéressé.e.s
        </TextLight>
      </Box>

      <Spacer axis="vertical" size={3} />

      <MissionDetail
        Icon={<Location size={24} />}
        title={mission.location}
        text="21 bis rue du Progrès"
      />

      <Spacer axis="vertical" size={0.5} />

      <MissionDetail
        Icon={<Calendar size={24} />}
        title="20 Juin 2022"
        text="10h00 à 15h30"
      />

      <HeadingSection>Description</HeadingSection>
      <Text color="grey">{mission.description}</Text>

      <HeadingSection>Organisé par</HeadingSection>
      <Box justifyContent="space-between" alignItems="center">
        <Link
          to={{
            screen: "Profile",
            params: { id: { missionId }, type: "organization" },
          }}
        >
          <Box alignItems="center">
            <ImageBackground
              source={{ uri: mission.logo }}
              style={{ width: 80, height: 40 }}
              resizeMode="contain"
            />

            <Spacer axis="horizontal" size={1} />

            <Box flexDirection="column">
              <Text>{mission.organization}</Text>
              <Text color="grey">{mission.location}</Text>
            </Box>
          </Box>
        </Link>

        <Button size="sm" color="black">
          Suivre
        </Button>
      </Box>

      <Spacer axis="vertical" size={4} />

      {/* FIXME: Add fixed position. */}
      <FixedView>
        <Button>Je participe !</Button>
      </FixedView>
    </GlobalLayout>
  );
}

const StyledImage = styled.ImageBackground`
  width: 100%;
  height: 200px;
`;

const TextLight = styled(Text)`
  color: ${({ theme }) => theme.colors.grey[400]};
`;

const HeadingSection = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
`;

// FIXME
const FixedView = styled.View`
  /* position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px; */
`;
