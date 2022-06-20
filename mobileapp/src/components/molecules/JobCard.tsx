import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StackParamList } from "../../navigation/StackNavigationParams";
import { Card } from "../atoms/Card";
import { Text } from "../atoms/Text";
import styled from "styled-components/native";
import Box from "../atoms/Box";
import Spacer from "../atoms/Spacer";
import Avatar from "../atoms/Avatar";
import Location from "../../assets/icons/Location";
import Calendar from "../../assets/icons/Calendar";
import Token from "../../assets/icons/Token";

// TODO: add model of Mission.
type JobCardProps = {
  mission: any;
};

// TODO: Add real design
export default function JobCard({ mission }: JobCardProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Container onPress={() => navigation.navigate("Job", { id: mission.id })}>
      <JobBanner source={{ uri: mission.banner }} resizeMode="cover" />

      <Box display="flex" flexDirection="column" padding={1}>
        <Text size="lg">{mission.title}</Text>

        <Spacer axis="vertical" size={0.5} />

        <Box display="flex" alignItems="center">
          <Avatar size="sm" type="organization" src={mission.logo} />

          <Spacer axis="horizontal" size={0.5} />

          <Text size="xs" color="grey">
            {mission.organization.name}
          </Text>
        </Box>
      </Box>

      <JobDetails style={{ borderTopWidth: 1, borderTopColor: "#E5E7EB" }}>
        <FlexWrapper>
          <Location />

          <Spacer axis="horizontal" size={0.25} />

          <Text size="xs" color="grey">
            {/* TODO: Add real distance */}
            &gt; 10km
          </Text>
        </FlexWrapper>

        <FlexWrapper>
          <Calendar />

          <Spacer axis="horizontal" size={0.25} />

          <Text size="xs" color="grey">
            10/01/2023
          </Text>
        </FlexWrapper>

        <FlexWrapper>
          <Token color="primary" />

          <Spacer axis="horizontal" size={0.25} />

          <Text size="xs" color="primary">
            {mission.tokens}
          </Text>
        </FlexWrapper>
      </JobDetails>
    </Container>
  );
}

const Container = styled(Card)`
  border: ${({ theme }) => theme.border.width[1]} solid
    ${({ theme }) => theme.colors.grey[200]};
  padding: 0;
`;

const JobBanner = styled.ImageBackground`
  width: 100%;
  height: 150px;
  border-top-left-radius: ${({ theme }) => theme.border.radius.md};
  border-top-right-radius: ${({ theme }) => theme.border.radius.md};
  overflow: hidden;
`;

const JobDetails = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const FlexWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
