import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Pressable,
  StatusBar,
} from "react-native";
import { Header } from "../components/Header/Header";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import Box from "../components/Box";
import Text from "../components/Text";
import { MotiView, useAnimationState } from "moti";
import { RhemaBox } from "../components/RhemaBlock";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RhemaQuote } from "../components/RhemaQuote";
import { supabase } from "../lib/supabase";
import { RhemaDevotional } from "../components/RhemaDevotional";
import { Loading } from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { MotiPressable } from "moti/interactions";
import { useQuery, useQueries, useIsFetching } from "react-query";

const { width, height } = Dimensions.get("screen");

interface QuoteProps {
  author: string;
  text: string;
}

interface DevotionalProps {
  title: string;
  chapter: string;
  mainText: string;
  pass: string;
}

export const Rhema = () => {
  const theme = useTheme<Theme>();
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [devotionalVisible, setDevotionalVisible] = useState(false);
  const [buttonShown, setButtonShown] = useState<any>("flex");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const { data: quotes, isFetched: quoteFetching } = useQuery(
    "quotes",
    async (): Promise<any> => {
      const { data } = await supabase
        .from("quotes")
        .select("author, text")
        .match({ id: 1 });

      return data;
    }
  );

  const { data: devotional, isFetched: devotionalFetching } = useQuery(
    "devotional",
    async (): Promise<any> => {
      const { data: devotionalData, error: devotionalError } = await supabase
        .from("devotional")
        .select("title, chapter, mainText, pass")
        .match({ id: 1 });

      return devotionalData;
    }
  );

  const handleBoxStatePress = () => {
    //@ts-ignore
    return navigation.navigate("Notifications", {});
  };

  useEffect(() => {
    if (quoteFetching && devotionalFetching === true) {
      setIsLoading(false);
    }
  }, [quoteFetching, devotionalFetching]);

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.mainBackground,
          flex: 1,
        }}
      >
        <Header pageTitle='Palavras' />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MotiView>
              <RhemaBox
                author='Tim Keller'
                title='Palavra Rhema'
                bgColor={theme.colors.blue}
                icon={
                  //@ts-ignore
                  <Feather
                    name='feather'
                    size={24}
                    color={theme.colors.darkGray}
                  />
                }
                funcOnPress={() => setQuoteVisible(true)}
              />
              <RhemaBox
                author='Tim Keller'
                title='Devocional'
                bgColor={theme.colors.yellow}
                pass
                passContent='Matheus 6:5-8'
                funcOnPress={() => setDevotionalVisible(true)}
                icon={
                  //@ts-ignore
                  <MaterialCommunityIcons
                    name='hands-pray'
                    size={24}
                    color={theme.colors.darkGray}
                  />
                }
              />
            </MotiView>

            <Pressable
              style={{
                marginTop: 80,
                alignSelf: "center",
              }}
              onPress={handleBoxStatePress}
            >
              <MotiView
                style={{
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  backgroundColor: theme.colors.darkGray,
                  borderRadius: theme.borderRadii.sm,
                  flexDirection: "row",
                  width: width / 1.3,
                  height: height / 12,
                }}
                transition={{
                  type: "timing",
                }}
              >
                {/**@ts-ignore */}
                <Feather name='bell' size={24} color={theme.colors.grayBg} />
                <Text variant={"bold"} color='grayBg' fontSize={19}>
                  Mural de avisos
                </Text>
                {/**@ts-ignore */}
                <Feather
                  name='chevron-right'
                  size={24}
                  color={theme.colors.grayBg}
                />
              </MotiView>
            </Pressable>
            <RhemaQuote
              visible={quoteVisible}
              author={quotes[0].author}
              quote={quotes[0].text}
              handleClose={() => setQuoteVisible(false)}
            />
            <RhemaDevotional
              devotionalText={devotional[0].mainText}
              pass={devotional[0].pass}
              handleClose={() => setDevotionalVisible(false)}
              visible={devotionalVisible}
              chapter={devotional[0].chapter}
              title={devotional[0].title}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};
