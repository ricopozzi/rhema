import React, { useEffect, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../styles/light";
import Box from "./Box";
import Text from "./Text";
import { MotiText, MotiView, useAnimationState } from "moti";
import { Easing } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

interface BookProps {
  title: string;
  chapters: any;
  abbrev: string;
  handleOpenSheet: any;
  sheetOpen: boolean;
}

export const Book = ({
  title,
  chapters,
  handleOpenSheet,
  abbrev,
  sheetOpen,
}: BookProps) => {
  const theme = useTheme<Theme>();

  return (
    <Pressable
      style={{
        shadowColor: "#ececec",
        shadowOffset: {
          width: -1,
          height: -4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      }}
      onPress={handleOpenSheet}
    >
      <MotiView
        style={{
          width: width / 1.2,
          minHeight: height / 12,
          backgroundColor: theme.colors.white,
          borderRadius: 12,
          alignSelf: "center",
          marginTop: 10,
          justifyContent: "center",
          shadowColor: "#afafaf",
          shadowOffset: {
            width: 1,
            height: 4,
          },
          shadowOpacity: 0.35,
        }}
      >
        <Box position={"absolute"} ml='xm'>
          <MotiText
            style={{ zIndex: 3, elevation: 3, fontWeight: "600", fontSize: 18 }}
          >
            {title}
          </MotiText>
        </Box>
      </MotiView>
    </Pressable>
  );
};
