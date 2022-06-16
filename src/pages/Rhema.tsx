import { SafeAreaView, Dimensions } from "react-native";
import { Header } from "../components/Header/Header";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import Box from "../components/Box";
import Text from "../components/Text";
import { MotiView } from "moti";
import { RhemaBox } from "../components/RhemaBlock";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

export const Rhema = () => {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.mainBackground,
        flex: 1,
      }}
    >
      <Header pageTitle='Palavras' />
      <RhemaBox
        author='Tim Keller'
        title='Palavra Rhema'
        bgColor={theme.colors.blue}
        icon={
          <Feather name='feather' size={24} color={theme.colors.darkGray} />
        }
      />
      <RhemaBox
        author='Tim Keller'
        title='Devocional'
        bgColor={theme.colors.yellow}
        pass
        passContent='Matheus 6:5-8'
        icon={
          <MaterialCommunityIcons
            name='hands-pray'
            size={24}
            color={theme.colors.darkGray}
          />
        }
      />
    </SafeAreaView>
  );
};
