import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from "./src/theme/theme";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { useCachedResources } from "./src/common/hooks/useCachedResources";
import Loading from "./src/screens/Loading";
import { ToastAtom as Toast } from "./src/components/atoms/Toast";
import React from "react";
import { AuthProvider } from "./src/common/contexts/AuthContext";

export default function App() {
  const queryClient = new QueryClient();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>

          <Toast />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
