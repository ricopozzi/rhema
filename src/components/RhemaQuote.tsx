import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import Text from "./Text";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

interface QuoteProps {
  author: string;
  quote: string;
  visible: boolean;
  handleClose: any;
}

const { width, height } = Dimensions.get("screen");
const window = Dimensions.get("window");

const ImageData = [
  {
    id: 1,
    image: require("../../assets/1.jpeg"),
  },
  {
    id: 2,
    image: require("../../assets/2.jpeg"),
  },
  {
    id: 3,
    image: require("../../assets/3.jpeg"),
  },
];

export const RhemaQuote = ({
  author,
  quote,
  visible,
  handleClose,
}: QuoteProps) => {
  const theme = useTheme<Theme>();
  const quoteRef = useRef<any>();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState(
    require("../../assets/1.jpeg")
  );

  const getRandomImage = (min: number, max: number) => {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    const selectedImage = ImageData.find((item) => item.id === randomNumber);
    return setSelectedImage(selectedImage?.image);
  };

  useEffect(() => {
    if (status?.status !== "granted") {
      requestPermission();
    }
    getRandomImage(1, 3.9);
  }, []);

  const handleSave = async () => {
    const imageUri = await captureRef(quoteRef, {
      format: "jpg",
      quality: 1,
    });

    if (status?.status === "granted") {
      return MediaLibrary.createAssetAsync(imageUri).then(() => {
        return Alert.alert("foto salva !");
      });
    } else {
      return Alert.alert("É necessária permissão para salvar a foto");
    }
  };

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
      <AntDesign
        name='left'
        size={24}
        color={theme.colors.grayBg}
        style={{
          width: width / 3,
          position: "absolute",
          zIndex: 10,
          top: height / 13,
          left: 15,
        }}
        onPress={handleClose}
      />
      {/**@ts-ignore */}
      <ImageBackground
        //@ts-ignore
        source={selectedImage}
        resizeMode='cover'
        style={{
          flex: 1,
        }}
        ref={quoteRef}
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
            <Image
              resizeMode='contain'
              source={require("../../assets/rhemalight.png")}
              style={{
                width: width / 3,
                position: "absolute",
                left: window.width / 3,
              }}
            />
            <Box width={width / 3} />
          </Box>

          <Box
            width={width}
            height={height / 4}
            padding='md'
            style={{
              marginTop: height / 2.2,
            }}
          >
            <Text
              variant={"bold"}
              color={"mainBackground"}
              fontSize={34}
              fontWeight='bold'
            >
              {author}
            </Text>
            <Text
              variant={"serifRegular"}
              color='mainBackground'
              mt='xs'
              fontSize={23}
              lineHeight={31}
              letterSpacing={1.2}
              style={{
                width: width / 1.5,
              }}
            >
              {quote}
            </Text>
          </Box>
        </SafeAreaView>
      </ImageBackground>
      <Pressable
        style={{
          minWidth: width / 4,
          height: 40,
          paddingHorizontal: 10,
          backgroundColor: theme.colors.grayBg,
          marginLeft: "auto",
          marginRight: theme.spacing.xl,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          shadowColor: "#777777f4",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.55,
          shadowRadius: 10.84,

          elevation: 0,
          position: "absolute",
          bottom: height / 11,
          right: 10,
        }}
        onPress={handleSave}
      >
        <Text fontSize={18} variant={"medium"} fontWeight='500'>
          Salvar
        </Text>
      </Pressable>
    </Modal>
  );
};
