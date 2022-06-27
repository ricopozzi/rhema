import Box from "../components/Box";
import Text from "../components/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../styles/light";
import { Dimensions, Pressable, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { AntDesign } from "@expo/vector-icons";
import { bibleContext } from "../lib/useBible";
import { BibleSheet } from "../components/BibleSheet";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

export const ChapterScreen = () => {
  const theme = useTheme<Theme>();
  const route = useRoute();
  const navigation = useNavigation();
  const { abbrev, chapter }: any = route.params;
  const { handleSheetOpen, bookChapters, sheetOpen } = useContext(bibleContext);
  const [chapterData, setChapterData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      navigation.setOptions({ tabBarVisible: false });
      const { data } = await axios.get(
        `https://www.abibliadigital.com.br/api/verses/nvi/${abbrev.pt}/${chapter}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBGZWIgMjggMjAyMiAxMzozNTowNSBHTVQrMDAwMC5yaWNvcG96emlAaG90bWFpbC5jb20iLCJpYXQiOjE2NDYwNTUzMDV9.KsX_-uVIT5m5qx1ogi6r5cssJe6I04Kh_ZSTAkAGpWU",
          },
        }
      );
      setChapterData(data);
      setIsLoading(false);
    })();
  }, []);

  const renderVerse = ({ item }: any) => {
    return (
      <Text
        variant={"serif"}
        color='black'
        fontStyle='italic'
        mt='xm'
        lineHeight={30}
        fontSize={19}
      >
        <Text variant={"bold"} fontWeight={"600"} color='darkGray'>
          {item.number}
        </Text>
        . {item.text}
      </Text>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.mainBackground,
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Box
              width={width}
              height={height / 12}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems='center'
              paddingHorizontal={"md"}
            >
              <Box width={width / 6}>
                {/*@ts-ignore */}
                <AntDesign
                  //@ts-ignore
                  onPress={() => navigation.navigate("Bible")}
                  name='left'
                  size={24}
                  color={theme.colors.grayText}
                />
              </Box>

              <Pressable
                style={{
                  minWidth: width / 3,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                }}
                onPress={handleSheetOpen}
              >
                <Text
                  fontWeight={"500"}
                  variant='regularItalic'
                  color='grayText'
                  mr='xs'
                  fontSize={19}
                >
                  {chapterData.book.name}
                </Text>
                {/**@ts-ignore */}
                <Ionicons
                  name='caret-down'
                  size={17}
                  color={theme.colors.grayText}
                />
              </Pressable>
              <Box
                justifyContent={"center"}
                alignItems='center'
                width={width / 6}
                height={35}
                borderRadius='sm'
                backgroundColor={"grayText"}
              >
                <Text fontWeight={"600"} color='grayBg' letterSpacing={2}>
                  NVI
                </Text>
              </Box>
            </Box>
            <Text
              color='grayText'
              fontWeight={"700"}
              textAlign='center'
              mt='xs'
              fontSize={38}
            >
              {chapterData.chapter.number}
            </Text>
            <Box
              style={{
                flex: 1,
              }}
            >
              <FlatList
                data={chapterData.verses}
                keyExtractor={(item) => item.number}
                renderItem={renderVerse}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  padding: 20,
                }}
                initialNumToRender={10}
              />
            </Box>
          </>
        )}
      </SafeAreaView>
      <BibleSheet
        handleOpenClose={handleSheetOpen}
        isOpen={sheetOpen}
        chaptersProps={bookChapters}
        abbrev={abbrev}
      />
    </>
  );
};
