import { useState, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../pages/Home";
import { Events } from "../pages/Events";
import { Profile } from "../pages/Profile";
import {
  Poppins_400Regular,
  Poppins_300Light_Italic,
  Poppins_600SemiBold,
  Poppins_400Regular_Italic,
} from "@expo-google-fonts/poppins";
import {
  SourceSerifPro_300Light,
  SourceSerifPro_300Light_Italic,
  SourceSerifPro_400Regular,
} from "@expo-google-fonts/source-serif-pro";
import { ThemeProvider } from "@shopify/restyle";
import Theme from "../styles/light";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Rhema } from "../pages/Rhema";
import { supabase } from "../lib/supabase";
import * as Network from "expo-network";
import { AuthStack } from "./AuthStack";
import { BibleStack } from "./BibleStack";
import { Feather } from "@expo/vector-icons";
import { RhemaStack } from "./RhemaStack";
import { NoInternetScreen } from "../components/NoInternet";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export function Navigation() {
  const [session, setSession] = useState<any>(null);
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);

  const fontsToLoad = {
    Poppins_400Regular,
    Poppins_300Light_Italic,
    Poppins_600SemiBold,
    Poppins_400Regular_Italic,
    SourceSerifPro_300Light,
    SourceSerifPro_300Light_Italic,
    SourceSerifPro_400Regular,
  };

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        const { isConnected } = await Network.getNetworkStateAsync();
        if (isConnected === true) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
        setSession(supabase.auth.session());
        await Font.loadAsync(fontsToLoad);
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    })();

    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {isConnected ? (
          <NavigationContainer>
            <ThemeProvider theme={Theme}>
              {/**@ts-ignore */}
              {!session ? (
                <AuthStack />
              ) : (
                //@ts-ignore
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                      backgroundColor: "#fafafa",
                      borderTopWidth: 0,
                    },
                  }}
                  initialRouteName='Home'
                >
                  <Tab.Screen
                    options={{
                      tabBarIcon: ({ focused }) => (
                        //@ts-ignore
                        <MaterialIcons
                          name='event-note'
                          size={32}
                          color={focused ? "#5661f6" : "black"}
                        />
                      ),
                      tabBarShowLabel: false,
                    }}
                    name='Events'
                    component={Events}
                  />
                  <Tab.Screen
                    name='bible'
                    component={BibleStack}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        //@ts-ignore
                        <Feather
                          name='book'
                          size={32}
                          color={focused ? "#b6b6b6" : "black"}
                        />
                      ),
                      tabBarShowLabel: false,
                    }}
                  />
                  <Tab.Screen
                    options={{
                      tabBarIcon: ({ focused }) => (
                        //@ts-ignore
                        <AntDesign
                          name='home'
                          size={32}
                          color={focused ? "#F6C056" : "black"}
                        />
                      ),
                      tabBarShowLabel: false,
                    }}
                    name='Home'
                    component={Home}
                  />

                  <Tab.Screen
                    options={{
                      tabBarIcon: ({ focused }) => (
                        //@ts-ignore
                        <Entypo
                          name='feather'
                          size={32}
                          color={focused ? "#33dd3c" : "black"}
                        />
                      ),
                      tabBarShowLabel: false,
                    }}
                    name='Rhema'
                    component={RhemaStack}
                  />

                  <Tab.Screen
                    options={{
                      tabBarIcon: ({ focused }) => (
                        //@ts-ignore
                        <Octicons
                          name='person'
                          size={32}
                          color={focused ? "#f66156" : "black"}
                        />
                      ),
                      tabBarShowLabel: false,
                    }}
                    name='Profile'
                    component={Profile}
                  />
                </Tab.Navigator>
              )}
            </ThemeProvider>
          </NavigationContainer>
        ) : (
          <NoInternetScreen />
        )}
      </View>
    </>
  );
}
