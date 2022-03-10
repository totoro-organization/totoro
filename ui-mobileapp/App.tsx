import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import theme from "./src/theme/theme";
import RootStackNavigator from "./src/navigation/RootStackNavigator";

// NOTE: remove me later, this is an example to use styled-components.
// const Container = styled(View)`
//   background-color: ${({ theme }) => theme.colors.primary[500]};
//   height: 100%;
// `;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
