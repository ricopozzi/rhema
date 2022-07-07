import "react-native-url-polyfill/auto";
import { Navigation } from "./src/navigation/index";
import * as Notifications from "expo-notifications";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light_Italic,
  Poppins_400Regular_Italic,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
  SourceSerifPro_300Light_Italic,
  SourceSerifPro_300Light,
  SourceSerifPro_400Regular,
} from "@expo-google-fonts/source-serif-pro";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync();
    })();
  }, []);

  // const [fontsLoaded] = useFonts({
  //   Poppins_400Regular,
  //   Poppins_300Light_Italic,
  //   Poppins_600SemiBold,
  //   Poppins_400Regular_Italic,
  //   SourceSerifPro_300Light,
  //   SourceSerifPro_300Light_Italic,
  //   SourceSerifPro_400Regular,
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
