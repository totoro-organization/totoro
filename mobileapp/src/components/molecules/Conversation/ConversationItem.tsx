import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StackParamList } from "../../../navigation/StackNavigationParams";
import Avatar from "../../atoms/Avatar";
import Box from "../../atoms/Box";
import Spacer from "../../atoms/Spacer";
import { Text } from "../../atoms/Text";
import styled from "styled-components/native";

type ConversationItemsProps = {
  chats: any;
};

// TODO: Add text when the job is expired "Mission terminée" (cf figma).
export default function ConversationItem({ chats }: ConversationItemsProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Conversation", { id: chats.id })}
    >
      <Box justifyContent="space-between">
        <Box>
          <Avatar src="https://images.unsplash.com/photo-1566492031773-4f4e44671857" />

          <Spacer axis="horizontal" size={0.5} />

          <Box flexDirection="column">
            <TruncateText numberOfLines={2}>{chats.mission.title}</TruncateText>

            <Spacer axis="vertical" size={0.25} />

            <TruncateText color="grey" numberOfLines={1}>
              {chats.messages[0].user.username}: {chats.messages[0].text}
            </TruncateText>
          </Box>
        </Box>

        <Text color="grey">15h04</Text>
      </Box>
    </TouchableOpacity>
  );
}

const TruncateText = styled(Text)`
  width: 180px;
`;
