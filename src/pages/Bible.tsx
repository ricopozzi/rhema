import React, { useState, useContext } from "react";
import { Dimensions, FlatList, Pressable, SafeAreaView } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../styles/light";
import { useQuery } from "react-query";
import { Header } from "../components/Header/Header";
import { Book } from "../components/Book";
import { bibleContext } from "../lib/useBible";
import axios from "axios";
import { BibleSheet } from "../components/BibleSheet";
import { Loading } from "../components/Loading";

export function Bible() {
  const theme = useTheme<Theme>();
  const {
    bookName,
    setBookNames,
    bookChapters,
    toArray,
    handleAbbrev,
    abbrev,
    handleSheetOpen,
    sheetOpen,
  } = useContext(bibleContext);
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useQuery<any>("books", async () => {
    const { data } = await axios.get(
      "https://www.abibliadigital.com.br/api/books",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBGZWIgMjggMjAyMiAxMzozNTowNSBHTVQrMDAwMC5yaWNvcG96emlAaG90bWFpbC5jb20iLCJpYXQiOjE2NDYwNTUzMDV9.KsX_-uVIT5m5qx1ogi6r5cssJe6I04Kh_ZSTAkAGpWU",
        },
      }
    );
    setBookNames(data);
    setIsLoading(false);
    return data;
  });

  const renderItem = ({ item }: any) => (
    <Book
      key={`${Math.random()}-${item.abbrev}`}
      title={item.name}
      chapters={item.chapters}
      abbrev={item.abbrev}
      sheetOpen={sheetOpen}
      handleOpenSheet={() => {
        handleSheetOpen();
        toArray(item.chapters);
        handleAbbrev(item.abbrev);
      }}
    />
  );

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.mainBackground,
        }}
      >
        <Header pageTitle='Bíblia' />
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={bookName}
            renderItem={renderItem}
            contentContainerStyle={{}}
          />
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
}
