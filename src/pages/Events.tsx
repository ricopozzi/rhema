import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header/Header";
import { useTheme } from "@shopify/restyle";
import theme, { Theme } from "../styles/light";
import Box from "../components/Box";
import Text from "../components/Text";
import { Image, ScrollView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { BigEventSheet } from "../components/BigEventSheet";
import { EventSheet } from "../components/EventSheet";

const { width, height } = Dimensions.get("screen");

export const Events = () => {
  const [bigOpen, setBigOpen] = useState(false);
  const [smallOpen, setSmallOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //@ts-ignore
  const t = useTheme<Theme>(theme);

  const [smallEvents, setSmallEvents] = useState([]);
  const [bigEvent, setBigEvent] = useState([
    {
      title: "xxx",
      shortDescription: "xxx",
      imageurl:
        "https://i.picsum.photos/id/450/200/200.jpg?hmac=DluUYibC-zBoNHLOHsO6aHIuiA3pDhholFjiR5KcwR0",
      adress: "xxx",
      date: "xxx",
      time: "xxx",
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState([
    {
      title: "xxx",
      shortDescription: "xxx",
      imageurl:
        "https://i.picsum.photos/id/450/200/200.jpg?hmac=DluUYibC-zBoNHLOHsO6aHIuiA3pDhholFjiR5KcwR0",
    },
  ]);

  const handleEventSelect = () => {
    return setSelectedEvent(smallEvents[0]);
  };

  useEffect(() => {
    (async () => {
      const { data: biggy } = await supabase
        .from("events")
        .select(
          "title, shortDescription, imageurl, description, adress, date, time"
        );

      //@ts-ignore
      setBigEvent(biggy);

      const { data: littleEvents } = await supabase
        .from("smallevents")
        .select(
          "title, dayoftheweek, shortdescription, imageurl, dayasnumber, adress, date, time"
        );

      //@ts-ignore
      const sorted = littleEvents.sort(function (a: any, b: any) {
        if (a.dayasnumber < b.dayasnumber) {
          return -1;
        }
        if (a.dayasnumber > b.dayasnumber) {
          return 1;
        } else {
          return 0;
        }
      });
      //@ts-ignore
      setSmallEvents(sorted);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: t.colors.mainBackground,
        }}
      >
        <Header pageTitle='Eventos' />
        <StatusBar barStyle='dark-content' />
        {isLoading ? (
          <Box
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size='large' />
          </Box>
        ) : (
          <ScrollView
            style={{
              backgroundColor: "#fafafa",
              flex: 1,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
              minHeight: height,
            }}
          >
            <Box
              width={width / 1.07}
              height={height / 2.4}
              backgroundColor={"white"}
              alignSelf='center'
              borderRadius={"md"}
              //@ts-ignore
              key={`key=${bigEvent[0].id}`}
              padding='xm'
              style={{
                shadowColor: "#696969",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 6.84,

                elevation: 5,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setBigOpen(true)}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 10,
                    width: 80,
                    height: 32,
                    zIndex: 9999,
                    backgroundColor: t.colors.yellow,
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                    fontWeight='600'
                  >
                    NOVO
                  </Text>
                </Box>
                <Image
                  source={{ uri: bigEvent[0].imageurl }}
                  style={{
                    width: "100%",
                    height: width / 2.25,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "timing" }}
                  delay={300}
                  resizeMode={"cover"}
                />

                <Text mt='xs' paddingHorizontal={"xm"} variant={"pageTitle"}>
                  {bigEvent[0].title}
                </Text>
                <Text paddingHorizontal={"xm"} mt='xs'>
                  {bigEvent[0].shortDescription}
                </Text>
              </TouchableOpacity>
            </Box>
            {/* <ModalMainEvent
            mainEventUrl={item.imageurl}
            isVisible={bigEventOpen}
            mainEventText={item.description}
            mainEventTitle={item.title}
            handleClose={() => setBigEventOpen(!bigEventOpen)}
          /> */}

            <Text variant={"medium"} paddingHorizontal={"md"} mt={"xl"}>
              Programação semanal
            </Text>

            <Box
              width={width}
              minHeight={height / 10}
              paddingHorizontal='md'
              justifyContent={"center"}
              alignItems='center'
              mt='xm'
            >
              {smallEvents.map((item: any, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSmallOpen(true);
                      return setSelectedEvent(item);
                    }}
                    key={index}
                  >
                    <Box
                      width={width / 1.07}
                      minHeight={height / 10}
                      backgroundColor={"softGray"}
                      mt={"lg"}
                      borderRadius='lg'
                      paddingHorizontal={"lg"}
                      paddingVertical='xs'
                      flexDirection={"row"}
                    >
                      <Box>
                        <Image
                          source={{ uri: item.imageurl }}
                          style={{
                            height: 55,
                            width: 55,
                            borderRadius: 99,
                          }}
                        />
                        <Text
                          style={{
                            alignSelf: "center",
                          }}
                          fontSize={12}
                          fontWeight={"800"}
                          color={"darkGray"}
                          mt={"xs"}
                        >
                          {item.dayoftheweek.split("-")[0]}
                        </Text>
                      </Box>

                      <Box flex={1} px={"xs"} justifyContent='space-evenly'>
                        <Text textAlign={"left"} fontWeight={"600"}>
                          {item.title}
                        </Text>
                        <Text fontSize={14} mt={"xs"}>
                          {item.shortdescription}
                        </Text>
                      </Box>
                      {/*@ts-ignore */}
                      <Ionicons
                        style={{
                          alignSelf: "center",
                        }}
                        name='chevron-forward'
                        size={24}
                        color='black'
                      />
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </ScrollView>
        )}
      </SafeAreaView>
      <BigEventSheet
        isOpen={bigOpen}
        handleOpenClose={() => setBigOpen(false)}
        eventProps={bigEvent[0]}
      />
      <EventSheet
        isOpen={smallOpen}
        handleOpenClose={() => setSmallOpen(false)}
        eventProps={selectedEvent}
      />
    </>
  );
};
