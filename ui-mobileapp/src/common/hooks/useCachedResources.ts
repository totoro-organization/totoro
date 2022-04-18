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
        // await Font.loadAsync({
        //   "inter-display-regular": require("../assets/fonts/InterDisplay-Regular.ttf"),
        //   "inter-display-medium": require("../assets/fonts/InterDisplay-Medium.ttf"),
        //   "inter-display-semibold": require("../assets/fonts/InterDisplay-SemiBold.ttf"),
        //   "inter-display-bold": require("../assets/fonts/InterDisplay-Bold.ttf"),
        // });
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
