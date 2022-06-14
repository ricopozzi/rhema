import { View, TouchableOpacity, Text } from "react-native";
import Box from "../Box";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

//@ts-ignore
export function TabNavigator({ state, descriptors, navigation }) {
  return (
    <Box
      style={{
        flexDirection: "row",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#585858",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.26,
        shadowRadius: 6.68,

        elevation: 11,
      }}
      width={width / 1.07}
      backgroundColor='yellow'
      justifyContent='center'
      alignItems='center'
      borderRadius='hg'
      flexDirection='row'
      height={height / 1 / 13}
      alignSelf='center'
      position='absolute'
      bottom={20}
    >
      {/*@ts-ignore */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole='button'
            //@ts-ignore
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width: 40, alignItems: "center", backgroundColor: "#ff2" }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}
