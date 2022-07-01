import { SafeAreaView } from "react-native-safe-area-context";
import { MotiImage } from "moti";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import { Image, Text } from "react-native";

export function NoInternetScreen() {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.mainBackground,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 200,
        }}
        source={require("../../assets/rhemadark.png")}
        resizeMode={"contain"}
      />
      <Text
        style={{
          fontSize: 16,
          paddingHorizontal: 30,
          textAlign: "center",
        }}
      >
        É necesário estar conectado para utilizar o aplicativo
      </Text>
    </SafeAreaView>
  );
}
