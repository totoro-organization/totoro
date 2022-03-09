import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from "styled-components";

import { Text, View } from "react-native";
import theme from "./src/theme/theme";

const Container = styled(View)`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  height: 100%;
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* TODO: add navigation here */}
      <Container>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </Container>
    </ThemeProvider>
  );
}
