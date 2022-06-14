import Box from "../Box";
import Text from "../Text";
import { Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("screen");

interface HeaderProps {
  pageTitle: string;
}

export function Header({ pageTitle }: HeaderProps) {
  return (
    <Box
      padding={"xs"}
      paddingHorizontal='md'
      width={width}
      height={height / 13}
      backgroundColor='mainBackground'
      flexDirection={"row"}
      justifyContent='space-between'
      alignItems={"center"}
    >
      <Text fontWeight={"bold"} variant='pageTitle'>
        {pageTitle}
      </Text>
      <Image
        style={{
          width: width / 4,
          height: height / 14,
        }}
        resizeMode='contain'
        source={require("../../../assets/rhemadark.png")}
      />
    </Box>
  );
}
