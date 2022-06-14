import Box from "./Box";
import Text from "./Text";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("screen");

interface BigEventSheet {
  isOpen: any;
  handleOpenClose: any;
  eventProps: any;
}

export const EventSheet = ({
  isOpen,
  handleOpenClose,
  eventProps,
}: BigEventSheet) => {
  return (
    <Modal
      onBackdropPress={handleOpenClose}
      style={{ margin: 0 }}
      isVisible={isOpen}
    >
      <Box
        position={"absolute"}
        bottom={0}
        width={width}
        height={height / 1.3}
        backgroundColor='mainBackground'
        borderTopRightRadius={"md"}
        borderTopLeftRadius={"md"}
        padding='xm'
      >
        <Box
          width={40}
          height={7}
          backgroundColor='darkGray'
          alignSelf={"center"}
          borderRadius={"hg"}
        />
        <Text
          textAlign={"center"}
          fontWeight='700'
          variant={"pageTitle"}
          color={"black"}
          mt='xm'
        >
          {eventProps.title}
        </Text>
        <Text mt='xl' paddingHorizontal={"md"} variant='medium'>
          {eventProps.shortdescription}
        </Text>
        <Box
          mt='xl'
          flexDirection={"row"}
          paddingHorizontal={"md"}
          alignItems='center'
          height={20}
        >
          <Text>Endereço:</Text>
          <Text paddingHorizontal={"md"}>{eventProps.adress}</Text>
        </Box>

        <Box
          mt='xl'
          flexDirection={"row"}
          paddingHorizontal={"md"}
          alignItems='center'
          height={20}
        >
          <Text>Data:</Text>
          <Text paddingHorizontal={"md"}>{eventProps.date}</Text>
        </Box>
        <Box
          mt='xl'
          flexDirection={"row"}
          paddingHorizontal={"md"}
          alignItems='center'
          height={20}
        >
          <Text>Hora:</Text>
          <Text paddingHorizontal={"md"}>{eventProps.time}</Text>
        </Box>
      </Box>
    </Modal>
  );
};
