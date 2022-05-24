import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import theme from "./src/theme/theme";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { useCachedResources } from "./src/common/hooks/useCachedResources";
import Loading from "./src/screens/Loading";
import { ToastAtom as Toast } from "./src/components/atoms/Toast";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>

      <Toast />
    </ThemeProvider>
  );
}
