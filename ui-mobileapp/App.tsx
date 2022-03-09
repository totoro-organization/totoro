import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import { Text, View } from "react-native";

const Container = styled.View`
  background-color: red;
`;

export default function App() {
  return (
    <Container>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </Container>
  );
}
