import Box from "./Box";
import Text from "./Text";
import { Dimensions, Pressable } from "react-native";
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
      backdropColor={"#000000aa"}
    >
      <Pressable
        style={{
          flex: 1,
        }}
        onPress={handleOpenClose}
      >
        <Box
          position={"absolute"}
          bottom={0}
          width={width}
          height={height / 1.8}
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
            fontSize={22}
            color={"darkGray"}
            mt='xm'
          >
            {eventProps.title}
          </Text>
          <Text
            textAlign={"center"}
            mt='xs'
            color='grayText'
            variant={"bold"}
            fontSize={15}
          >
            {eventProps.dayoftheweek}
          </Text>
          <Text fontSize={17} mt='xl' paddingHorizontal={"md"} variant='medium'>
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
            <Text fontSize={15} paddingHorizontal={"md"}>
              {eventProps.adress}
            </Text>
          </Box>

          <Box
            mt='xl'
            flexDirection={"row"}
            paddingHorizontal={"md"}
            alignItems='center'
            height={20}
          >
            <Text>Hora:</Text>
            <Text fontSize={15} paddingHorizontal={"md"}>
              {eventProps.time}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </Modal>
  );
};
