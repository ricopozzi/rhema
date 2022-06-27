import Box from "./Box";
import Text from "./Text";
import { MotiView } from "moti";
import { Dimensions } from "react-native";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import { Feather } from "@expo/vector-icons";

const { width, height, fontScale } = Dimensions.get("screen");

export const Notification = ({
  title,
  description,
  created_at,
}: {
  title: string;
  description: string;
  created_at: string;
}) => {
  const theme = useTheme<Theme>();

  const time = new Date(created_at).toLocaleTimeString().split(":");

  return (
    <Box
      width={width}
      mt='xs'
      flexDirection={"row"}
      style={{
        minHeight: height / 7,
        maxHeight: 250,
      }}
    >
      <Box
        style={{
          width: "30%",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/**@ts-ignore */}
        <Feather name='bell' size={40} color={theme.colors.darkGray} />
      </Box>
      <Box
        ml='xm'
        justifyContent={"space-evenly"}
        paddingRight='xs'
        flexWrap={"wrap"}
        flex={1}
      >
        <Text
          variant={"bold"}
          style={{
            fontSize: 16,
            width: "100%",
          }}
        >
          {title}
        </Text>
        <Text
          variant={"serifRegular"}
          style={{
            fontSize: 15,
            width: "100%",
          }}
          paddingVertical={"xs"}
        >
          {description}
        </Text>
        <Box alignItems={"center"} flexDirection={"row"}>
          <Text fontSize={14} mr='xs'>
            {new Date(created_at).toLocaleDateString()}
          </Text>
          <Text paddingVertical={"xs"} variant={"bold"} fontSize={14}>
            {`${time[0]}:${time[1]}`}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
