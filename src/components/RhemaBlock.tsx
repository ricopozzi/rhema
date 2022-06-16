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
}

export const RhemaBox = ({
  bgColor,
  title,
  author,
  icon,
  pass = false,
  passContent,
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
        <Text variant={"medium"} fontWeight='600' color='darkGray' ml='md'>
          {title}
        </Text>
      </Box>
      <Box
        style={{
          height: "70%",
          backgroundColor: bgColor,
        }}
        borderRadius='md'
        padding='md'
        justifyContent={"space-between"}
      >
        <Box flexDirection={"row"} alignItems='flex-end'>
          <Text variant={"medium"} fontWeight='500' color='mainBackground'>
            {pass ? "Passagem:" : "Autor:"}
          </Text>
          <Text fontWeight='600' color='mainBackground' ml='xs' fontSize={16}>
            {pass ? passContent : author}
          </Text>
        </Box>
        <Pressable
          style={{
            width: "60%",
            height: "50%",
            backgroundColor: theme.colors.mainBackground,
            alignSelf: "center",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text variant='medium' fontWeight={"600"} color='darkGray'>
            Ver
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
