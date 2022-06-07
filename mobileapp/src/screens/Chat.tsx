import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FAKE_MESSAGES_DATA } from "../common/mockedData";
import { Text } from "../components/atoms/Text";
import GlobalLayout from "../components/layouts/GlobalLayout";
import { StackParamList } from "../navigation/StackNavigationParams";

// TODO: Rename me to Messagerie?
export default function Chat() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <GlobalLayout>
      {/* TODO: Create a dedicated component */}
      {FAKE_MESSAGES_DATA.map((conversation) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Conversation", { id: conversation.id })
          }
        >
          <Text>{conversation.mission.title}</Text>
          <Text color="grey">
            {conversation.messages[0].user.username}:{" "}
            {conversation.messages[0].text}
          </Text>
        </TouchableOpacity>
      ))}
    </GlobalLayout>
  );
}
