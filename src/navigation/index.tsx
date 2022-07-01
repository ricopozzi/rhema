import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../pages/Home";
import { Events } from "../pages/Events";
import { Profile } from "../pages/Profile";
import { ThemeProvider } from "@shopify/restyle";
import Theme from "../styles/light";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
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

const { width, height } = Dimensions.get("screen");

const Tab = createBottomTabNavigator();

export function Navigation() {
  const [session, setSession] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      if (isConnected === true) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    })();

    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
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
                    // shadowColor: "#d4d4d4",
                    // shadowOffset: {
                    //   width: 0,
                    //   height: -2,
                    // },
                    // shadowOpacity: 0.7,
                    // shadowRadius: 10.84,
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
    </>
  );
}
