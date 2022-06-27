import React, { useEffect, useState } from "react";
import { SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import Box from "../components/Box";
import Text from "../components/Text";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import { Image } from "moti";
import { supabase } from "../lib/supabase";
import { Loading } from "../components/Loading";

const { width, height } = Dimensions.get("screen");

export const Profile: React.FC = () => {
  const theme = useTheme<Theme>();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profile, setProfile] = useState<any>("Seu nome");

  const handleSignOut = async () => {
    const {} = await supabase.auth.signOut();
    return;
  };

  useEffect(() => {
    (async () => {
      setIsLoadingProfile(true);
      //@ts-ignore
      const userId = await supabase.auth.user().id;
      const { data } = await supabase
        .from("profile")
        .select("display_name")
        .match({ id: userId });

      //@ts-ignore
      setProfile(data[0].display_name);
      setIsLoadingProfile(false);
    })();
  }, []);

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
          alignSelf: "center",
          marginLeft: 20,
        }}
        resizeMode='contain'
        source={require("../../assets/rhemadark.png")}
      />

      {isLoadingProfile ? (
        <Loading />
      ) : (
        <Text
          variant={"pageTitle"}
          style={{ alignSelf: "center" }}
          fontWeight='bold'
          mt='xm'
        >
          {profile}
        </Text>
      )}

      <TouchableOpacity
        style={{
          width: width / 3.5,
          height: 40,
          borderColor: theme.colors.mainRed,
          borderWidth: 1,
          alignSelf: "center",
          marginTop: 30,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleSignOut}
      >
        <Text variant={"pageTitle"} fontWeight='700' color='mainRed'>
          sair
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
