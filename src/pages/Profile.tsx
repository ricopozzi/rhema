import React from "react";
import { SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import Box from "../components/Box";
import Text from "../components/Text";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import { Image } from "moti";

const { width, height } = Dimensions.get("screen");

export const Profile: React.FC = () => {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.mainBackground,
        paddingBottom: 100,
      }}
    >
      <Image
        style={{
          width: width / 2,
          alignSelf: "flex-start",
          marginLeft: 20,
        }}
        resizeMode='contain'
        source={require("../../assets/rhemadark.png")}
      />

      <Text
        variant={"pageTitle"}
        style={{ alignSelf: "flex-start", paddingLeft: 20 }}
        fontWeight='bold'
        mt='xm'
      >
        Lucas Oliveira
      </Text>
      <Box mt='xl' style={{ paddingLeft: 20 }}>
        <Text fontWeight={"bold"} color='grayText'>
          Líderes:
        </Text>
        <Text variant={"medium"} mt='xs' fontWeight={"500"}>
          Léo e Stefani
        </Text>
      </Box>
      <Box mt='md' style={{ paddingLeft: 20 }}>
        <Text fontWeight={"bold"} color='grayText'>
          Data de Nascimento:
        </Text>
        <Text variant={"medium"} mt='xs' fontWeight={"500"}>
          30/10/1997
        </Text>
      </Box>
      <Box mt='md' style={{ paddingLeft: 20 }}>
        <Text fontWeight={"bold"} color='grayText'>
          Ministério:
        </Text>
        <Text variant={"medium"} mt='xs' fontWeight={"500"}>
          Louvor
        </Text>
      </Box>
      <Box mt='md' style={{ paddingLeft: 20 }}>
        <Text fontWeight={"bold"} color='grayText'>
          Data de Batismo:
        </Text>
        <Text variant={"medium"} mt='xs' fontWeight={"500"}>
          13/04/2015
        </Text>
      </Box>

      <TouchableOpacity
        style={{
          width: width / 3.5,
          height: 40,
          borderColor: theme.colors.mainRed,
          borderWidth: 1,
          alignSelf: "center",
          marginTop: 80,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text variant={"pageTitle"} fontWeight='700' color='mainRed'>
          sair
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
