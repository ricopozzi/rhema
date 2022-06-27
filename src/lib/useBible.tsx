import { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

interface BibleContextProps {
  bookName?: any;
  isLoading?: boolean;
  setIsLoading?: any;
  setBookNames?: any;
  setBookChapters?: any;
  bookChapters?: any;
  toArray?: any;
  abbrev?: string;
  handleAbbrev?: any;
  navigateToChapter?: any;
  handleSheetOpen?: any;
  sheetOpen?: any;
}

export const bibleContext = createContext<BibleContextProps>({});

export function BibleProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [abbrev, setAbbrev] = useState("");
  const [bookName, setBookNames] = useState<any>();
  const [bookChapters, setBookChapters] = useState<any>();
  const navigation = useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const toArray = async (chapters: any) => {
    const arrayFunctional = [];
    for (let x = 1; x <= chapters; x++) {
      arrayFunctional.push(x);
    }
    setBookChapters(arrayFunctional);
  };

  const handleAbbrev = (abbrev: string) => {
    return setAbbrev(abbrev);
  };

  const navigateToChapter = (number: any) => {
    //@ts-ignore
    return navigation.replace("Chapter", {
      abbrev,
      chapter: number,
    });
  };

  const handleSheetOpen = () => {
    return setSheetOpen(!sheetOpen);
  };

  return (
    <bibleContext.Provider
      value={{
        bookName,
        isLoading,
        setBookNames,
        setIsLoading,
        setBookChapters,
        bookChapters,
        toArray,
        handleAbbrev,
        abbrev,
        navigateToChapter,
        handleSheetOpen,
        sheetOpen,
      }}
    >
      {children}
    </bibleContext.Provider>
  );
}
