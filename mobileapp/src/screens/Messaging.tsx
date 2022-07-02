import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FAKE_MESSAGES_DATA } from "../common/mockedData";
import Spacer from "../components/atoms/Spacer";
import { Text } from "../components/atoms/Text";
import GlobalLayout from "../components/layouts/GlobalLayout";
import ConversationItem from "../components/molecules/Conversation/ConversationItem";
import { StackParamList } from "../navigation/StackNavigationParams";

export default function Messaging() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <GlobalLayout>
      {/* TODO: Replace me with real data (hooks) */}
      {FAKE_MESSAGES_DATA.map((conversation, index) => (
        <>
          <ConversationItem chats={conversation} key={index} />

          <Spacer axis="vertical" size={1} />
        </>
      ))}
    </GlobalLayout>
  );
}
