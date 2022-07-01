import { SafeAreaView, FlatList } from "react-native";
import { Notification } from "../components/Notification";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import Text from "../components/Text";
import { Feather } from "@expo/vector-icons";
import Box from "../components/Box";
import { useNavigation } from "@react-navigation/native";
import { Separator } from "../components/atoms/Separator";
import { MotiView } from "moti";
import { useContext, useState } from "react";
import { Loading } from "../components/Loading";
import { notificationContext } from "../lib/notificationContext";

export const NotificationsScreen = () => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();

  const { notification } = useContext(notificationContext);

  // const { data: notifications, isFetched } = useQuery(
  //   "notifications",
  //   async (): Promise<any> => {
  //     const { data: notificationsData, error: notificationsError } =
  //       await supabase
  //         .from("notifications")
  //         .select("title, description, id, created_at")
  //         .order("id", { ascending: false })
  //         .limit(10);
  //     return notificationsData;
  //   }
  // );

  // const memoizedNotifications = useMemo(() => notifications, [notifications]);

  const renderItem = ({ item, index }: any) => {
    return (
      <MotiView
        key={index}
        from={{ opacity: 0, translateY: -40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 400,
        }}
        delay={index * 150}
        style={{
          minHeight: 100,
        }}
      >
        <Notification
          key={index}
          title={item.title}
          description={item.description}
          created_at={item.created_at}
        />
      </MotiView>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.mainBackground,
      }}
    >
      <>
        <Box
          flexDirection={"row"}
          justifyContent='space-between'
          alignItems={"center"}
          paddingHorizontal='md'
        >
          {/**@ts-ignore */}
          <Feather
            name='chevron-left'
            size={30}
            color={theme.colors.darkGray}
            style={{}}
            onPress={() => navigation.goBack()}
          />

          <Text
            variant={"bold"}
            fontSize={19}
            textAlign={"center"}
            marginVertical='lg'
          >
            Últimos avisos
          </Text>
          <Box />
        </Box>
        <FlatList
          data={notification}
          keyExtractor={({ item, index }) => `key-${Math.random()}`}
          //@ts-ignore
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: 20,
            justifyContent: "center",
          }}
        />
      </>
    </SafeAreaView>
  );
};
