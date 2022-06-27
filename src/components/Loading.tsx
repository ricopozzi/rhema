import { MotiView } from "moti";
import { Dimensions } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../styles/light";
import { Easing } from "react-native-reanimated";
import Box from "./Box";

const { width, height } = Dimensions.get("screen");

export const Loading = () => {
  const theme = useTheme<Theme>();

  return (
    <Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {[...Array(5).keys()].map((index) => {
        return (
          <MotiView
            key={index}
            style={{
              width: 50,
              height: 50,
              borderRadius: 99,
              backgroundColor: theme.colors.darkGray,
              position: "absolute",
            }}
            from={{ opacity: 0.3, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{
              type: "timing",
              loop: true,
              duration: 1700,
              delay: index * 400,
              easing: Easing.linear,
              repeatReverse: false,
            }}
          />
        );
      })}
    </Box>
  );
};
