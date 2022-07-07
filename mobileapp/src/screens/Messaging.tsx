import React from "react";
import { View } from "react-native";
import { FAKE_MESSAGES_DATA } from "../common/mockedData";
import Spacer from "../components/atoms/Spacer";
import GlobalLayout from "../components/layouts/GlobalLayout";
import ConversationItem from "../components/molecules/Conversation/ConversationItem";
import ConversationsNotFound from "../components/molecules/Conversation/ConversationsNotFound";

export default function Messaging() {
  return (
    <GlobalLayout>
      {FAKE_MESSAGES_DATA.length < 0 && <ConversationsNotFound />}

      {/* TODO: Replace me with real data (hooks) */}
      {FAKE_MESSAGES_DATA.map((conversation, index) => (
        <View key={`${conversation.id}-${index}`}>
          <ConversationItem chats={conversation} />

          <Spacer axis="vertical" size={1} />
        </View>
      ))}
    </GlobalLayout>
  );
}
