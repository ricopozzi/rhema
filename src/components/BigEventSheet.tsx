import Box from "./Box";
import Text from "./Text";
import { Dimensions, Pressable } from "react-native";
import Modal from "react-native-modal";
import theme from "../styles/light";

const { width, height } = Dimensions.get("screen");

interface BigEventSheet {
  isOpen: any;
  handleOpenClose: any;
  eventProps: any;
}

export const BigEventSheet = ({
  isOpen,
  handleOpenClose,
  eventProps,
}: BigEventSheet) => {
  return (
    <Modal
      onBackdropPress={handleOpenClose}
      style={{ margin: 0 }}
      isVisible={isOpen}
      backdropColor={"#000000aa"}
    >
      <Pressable style={{ flex: 1 }} onPress={handleOpenClose}>
        <Box
          position={"absolute"}
          bottom={0}
          width={width}
          height={height / 1.5}
          backgroundColor='mainBackground'
          borderTopRightRadius={"sm"}
          borderTopLeftRadius={"sm"}
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
            variant={"bold"}
            color={"darkGray"}
            mt='xm'
            fontSize={22}
          >
            {eventProps.title}
          </Text>
          <Text fontSize={17} mt='xl' paddingHorizontal={"md"} variant='medium'>
            {eventProps.description}
          </Text>
          <Box
            mt='xl'
            flexDirection={"row"}
            paddingHorizontal={"md"}
            alignItems='center'
          >
            <Text>Endereço:</Text>
            <Text fontSize={17} paddingHorizontal={"md"} variant='medium'>
              {eventProps.adress}
            </Text>
          </Box>

          <Box
            mt='xl'
            flexDirection={"row"}
            paddingHorizontal={"md"}
            alignItems='center'
          >
            <Text>Data:</Text>
            <Text fontSize={15} paddingHorizontal={"md"} variant='medium'>
              {new Date(eventProps.date).toLocaleDateString()}
            </Text>
          </Box>
          <Box
            mt='xl'
            flexDirection={"row"}
            paddingHorizontal={"md"}
            alignItems='center'
          >
            <Text>Hora:</Text>
            <Text fontSize={17} paddingHorizontal={"md"} variant='medium'>
              {eventProps.time}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </Modal>
  );
};
