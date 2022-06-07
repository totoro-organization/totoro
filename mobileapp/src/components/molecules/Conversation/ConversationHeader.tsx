import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Arrow } from "../../../assets/icons";
import Info from "../../../assets/icons/Info";
import Spacer from "../../atoms/Spacer";
import { Text } from "../../atoms/Text";

type ConversationHeaderProps = {
  conversation: any;
};

export default function ConversationHeader({
  conversation,
}: ConversationHeaderProps) {
  return (
    <Container style={{ borderBottomWidth: 1, borderBottomColor: "#e2e2e2" }}>
      <Arrow size={24} />

      <View style={{ maxWidth: "70%" }}>
        {/* <Avatar variant="organization" src={conversation.mission.logo} /> */}
        <Text size="lg">{conversation.mission.title}</Text>

        <Spacer axis="vertical" size={0.25} />

        <Text color="grey">par {conversation.mission.organization}</Text>
      </View>

      <Info size={24} />
    </Container>
  );
}

const Container = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 60px;
  padding: 0 24px 24px 24px;
`;
