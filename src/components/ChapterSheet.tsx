import Box from "./Box";
import Text from "./Text";
import { Dimensions, FlatList } from "react-native";
import Modal from "react-native-modal";
import { MotiView } from "moti";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import { Chapter } from "./Chapter";
import { useContext } from "react";
import { bibleContext } from "../lib/useBible";

const { width, height } = Dimensions.get("screen");

interface BibleSheetProps {
  isOpen: any;
  handleOpenClose: any;
  chaptersProps: any;
  abbrev: any;
}

export const ChapterSheet = ({
  isOpen,
  handleOpenClose,
  chaptersProps,
  abbrev,
}: BibleSheetProps) => {
  const theme = useTheme<Theme>();

  const renderChapters = ({ item }: any) => (
    <Chapter abbrev={abbrev} number={item} />
  );
  return (
    <Modal
      onBackdropPress={handleOpenClose}
      style={{ margin: 0 }}
      isVisible={isOpen}
      backdropOpacity={0}
    >
      <MotiView
        style={{
          width: width,
          position: "absolute",
          height: height / 4,
          backgroundColor: theme.colors.white,
          bottom: 0,
          borderTopEndRadius: 30,
          borderTopLeftRadius: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 12,
          paddingLeft: 20,
        }}
      >
        <Box
          alignSelf={"center"}
          height={7}
          width={50}
          borderRadius='hg'
          backgroundColor='darkGray'
          mt='xs'
        />
        <Text textAlign={"center"} mt='xm' fontWeight={"600"} fontSize={20}>
          Capítulos
        </Text>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          data={chaptersProps}
          renderItem={renderChapters}
          horizontal
        />
      </MotiView>
    </Modal>
  );
};
