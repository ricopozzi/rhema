import Box from "./Box";
import Text from "./Text";
import { Dimensions, Pressable } from "react-native";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import { useContext } from "react";
import { bibleContext } from "../lib/useBible";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

interface ChapterProps {
  number: number;
  navigateTo?: any;
  abbrev: string;
  closeSheet?: any;
}

export const Chapter = ({ number, abbrev, closeSheet }: ChapterProps) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const route = useRoute();

  const pushRoute = () => {
    if (route.name === "Chapter") {
      //@ts-ignore
      navigation.push("Chapter", {
        abbrev,
        chapter: number,
      });
    }
    if (route.name === "Bible") {
      //@ts-ignore
      navigation.navigate("Chapter", {
        abbrev,
        chapter: number,
      });
    }
  };

  return (
    <Pressable
      onPress={() => {
        closeSheet();
        pushRoute();
      }}
    >
      <Box
        width={70}
        height={70}
        borderRadius='md'
        borderWidth={1}
        justifyContent='center'
        alignItems={"center"}
        mr='md'
      >
        <Text fontWeight={"600"} fontSize={18}>
          {number}
        </Text>
      </Box>
    </Pressable>
  );
};
