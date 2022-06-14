import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import Text from "../components/Text";
import Box from "../components/Box";
import { useTheme } from "@shopify/restyle";
import theme, { Theme } from "../styles/light";
import { Header } from "../components/Header/Header";
import { supabase } from "../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

const { width, height } = Dimensions.get("screen");

export const Home = () => {
  const [pictures, setPictures] = useState([]);
  const [textData, setTextData] = useState<any>({
    title: "",
  });
  //@ts-ignore
  const t = useTheme<Theme>(theme);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("worship")
        .select("title, mainText, pictures, likes")
        .match({ id: "8112e321-3dde-42af-aec2-076d102c00f8" });

      const worshipData = {
        title: data[0].title,
        mainText: data[0].mainText,
      };

      setTextData(worshipData);
      setPictures(data[0].pictures);
      //await registerForPushNotification();
    })();
  }, []);

  const renderItem = ({ item, index }: any) => (
    <Box
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
      key={index}
    >
      <Image
        source={{ uri: pictures[index] }}
        style={{
          width: width * 0.8 - 20,
          height: width / 2.3,
          marginHorizontal: 20,
          borderRadius: 12,
        }}
      />
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <StatusBar barStyle='dark-content' />
      <Header pageTitle='Início' />
      <ScrollView
        style={{
          backgroundColor: "#fafafa",
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 90,
        }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 800 }}
        >
          <FlatList
            data={pictures}
            renderItem={renderItem}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={({}) => `key-${Math.random()}`}
            snapToOffsets={[...Array(pictures.length)].map(
              (x, i) => i * (width * 0.8 - 20) + (i - 1) * 20
            )}
            snapToAlignment='start'
            scrollEventThrottle={16}
            decelerationRate='fast'
            style={{ marginTop: 10 }}
          />
        </MotiView>

        <Box
          style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 20 }}
          flexDirection='row'
          paddingHorizontal='xl'
          mt='xl'
        >
          {/*@ts-ignore */}
          <Ionicons
            name='bookmarks'
            size={24}
            color={t.colors.yellow}
            style={{ marginRight: 10 }}
          />
          <Text variant='medium' fontWeight={"700"}>
            {textData.title}
          </Text>
        </Box>

        <Box
          width={width / 1.06}
          alignSelf='center'
          backgroundColor={"bgSoftYellow"}
          marginTop='xs'
          minHeight={width / 3}
          padding='xs'
          borderRadius={"sm"}
        >
          <Text fontSize={17}>{textData.mainText}</Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
