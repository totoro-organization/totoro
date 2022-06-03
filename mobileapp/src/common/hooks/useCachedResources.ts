import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "Outfit-Regular": require("../../assets/fonts/Outfit-Regular.ttf"),
          "Outfit-Medium": require("../../assets/fonts/Outfit-Medium.ttf"),
          "Outfit-SemiBold": require("../../assets/fonts/Outfit-SemiBold.ttf"),
          "Outfit-ExtraBold": require("../../assets/fonts/Outfit-ExtraBold.ttf"),
        });
      } catch (loadCachedResourcesError) {
        console.error(loadCachedResourcesError);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
