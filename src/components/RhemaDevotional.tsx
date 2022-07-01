import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import Text from "./Text";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

interface DevotionalProps {
  pass: string;
  devotionalText: string;
  visible: boolean;
  handleClose: any;
  title: string;
  chapter: string;
}

const { width, height } = Dimensions.get("screen");

export const RhemaDevotional = ({
  pass,
  devotionalText,
  chapter,
  title,
  visible,
  handleClose,
}: DevotionalProps) => {
  const theme = useTheme<Theme>();

  return (
    <Modal
      isVisible={visible}
      style={{
        margin: 0,
        backgroundColor: theme.colors.darkGray,
        opacity: 1,
      }}
    >
      {/**@ts-ignore */}
      <ImageBackground
        source={require("../../assets/devotionalbackground.png")}
        resizeMode='cover'
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <Box
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent='space-between'
            width={width}
            height={height / 8}
            padding={"md"}
          >
            {/**@ts-ignore */}
            <AntDesign
              name='left'
              size={24}
              color={theme.colors.grayBg}
              style={{ width: width / 3 }}
              onPress={handleClose}
            />
            <Image
              resizeMode='contain'
              source={require("../../assets/rhemalight.png")}
              style={{
                width: width / 3,
              }}
            />
            <Box width={width / 3} />
          </Box>

          <Text
            style={{
              paddingHorizontal: 31,
            }}
            lineHeight={28}
            textAlign='center'
            color={"mainBackground"}
            fontSize={21}
            variant='serifRegular'
          >
            {pass}
          </Text>
          <Text
            style={{
              paddingHorizontal: 45,
            }}
            textAlign={"center"}
            color='mainBackground'
            fontWeight={"600"}
            fontSize={17}
            mt='lg'
            variant={"bold"}
          >
            {chapter}
          </Text>
          <ScrollView
            style={{
              width: width,
              height: height / 1.7,
              backgroundColor: theme.colors.softGray,
              position: "absolute",
              bottom: 0,
              borderTopEndRadius: 22,
              borderTopLeftRadius: 22,
              padding: theme.spacing.md,
            }}
            contentContainerStyle={{
              paddingBottom: 80,
            }}
          >
            <Text variant={"bold"} fontSize={26}>
              {title}
            </Text>
            <Text
              variant={"serifRegular"}
              mt='xm'
              fontSize={18}
              lineHeight={28}
              color='darkGray'
            >
              {devotionalText}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </Modal>
  );
};
