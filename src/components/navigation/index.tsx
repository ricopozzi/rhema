import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../../pages/Home";
import { Events } from "../../pages/Events";
import { ThemeProvider } from "@shopify/restyle";
import Theme from "../../styles/light";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

const Tab = createBottomTabNavigator();

export function Navigation() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={Theme}>
        {/**@ts-ignore */}
        <Tab.Navigator
          screenOptions={{
            headerShown: false,

            tabBarStyle: {
              position: "absolute",
              marginBottom: 1,
              bottom: 20,
              backgroundColor: "#FAFAFA",
              width: width / 1.07,
              height: height / 13,
              borderRadius: 999,
              marginLeft: 14,
              borderWidth: 0,

              shadowColor: "#686767",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.35,
              shadowRadius: 6.84,

              elevation: 5,
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
                <AntDesign
                  name='home'
                  size={32}
                  color={focused ? "#F6C056" : "black"}
                />
              ),
              tabBarShowLabel: false,
            }}
            name='Home3'
            component={Home}
          />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
