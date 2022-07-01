import { Dimensions, Pressable } from "react-native";
import Box from "./Box";
import Text from "./Text";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";

const { width, height } = Dimensions.get("screen");

interface RhemaBoxProps {
  bgColor: string;
  title: string;
  author?: string;
  icon: any;
  children?: any;
  pass?: boolean;
  passContent?: string;
  funcOnPress?: any;
}

export const RhemaBox = ({
  bgColor,
  title,
  author,
  icon,
  pass = false,
  passContent,
  funcOnPress,
}: RhemaBoxProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      width={width / 1.3}
      height={height / 4}
      alignSelf='center'
      mt='xm'
      padding={"xm"}
      justifyContent='space-between'
    >
      <Box
        style={{
          height: "20%",
          width: "100%",
        }}
        flexDirection='row'
        alignItems='center'
      >
        {icon}
        <Box width={width}>
          <Text variant={"medium"} fontWeight='600' color='darkGray' ml='md'>
            {title}
          </Text>
        </Box>
      </Box>
      <Text mt='xm' lineHeight={23} variant={"serif"}>
        {pass
          ? "Dedique alguns minutos para ouvir a palavra de Deus e você ficará perto Dele. "
          : "Citação para edificar a sua fé."}
      </Text>
      <Box
        style={{
          height: "70%",
        }}
        borderRadius='sm'
        padding='md'
        justifyContent={"space-between"}
      >
        <Box flexDirection={"row"} alignItems='center'>
          <Text fontSize={16} fontWeight='500' color='darkGray'>
            {pass ? "Passagem:" : "Autor:"}
          </Text>
          <Text variant={"bold"} color='darkGray' ml='xs' fontSize={16}>
            {pass ? passContent : author}
          </Text>
        </Box>
        <Pressable
          style={{
            width: "40%",
            height: "50%",
            backgroundColor: theme.colors.darkGray,
            alignSelf: "center",
            borderRadius: theme.borderRadii.sm,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: theme.colors.darkGray,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.34,
            shadowRadius: 11.27,

            elevation: 10,
          }}
          onPress={funcOnPress}
        >
          <Text variant='bold' color='mainBackground'>
            ver
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
