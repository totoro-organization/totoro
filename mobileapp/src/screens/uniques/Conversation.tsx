import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";

import { FAKE_MESSAGES_DATA } from "../../common/mockedData";
import { Text } from "../../components/atoms/Text";

import GlobalLayout from "../../components/layouts/GlobalLayout";
import ConversationHeader from "../../components/molecules/Conversation/ConversationHeader";
import { StackParamList } from "../../navigation/StackNavigationParams";

export default function Conversation({
  route,
}: StackScreenProps<StackParamList, "Conversation">) {
  const paramId = route.params.id;
  const conversation = FAKE_MESSAGES_DATA[paramId];

  return (
    <GlobalLayout header={<ConversationHeader conversation={conversation} />}>
      {conversation.messages.map((message) => (
        <View
          style={{
            borderRadius: 6,
            backgroundColor: "blue",
          }}
        >
          <Text color="white">{message.text}</Text>
        </View>
      ))}
    </GlobalLayout>
  );
}
