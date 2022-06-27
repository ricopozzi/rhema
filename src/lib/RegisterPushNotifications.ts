import { Platform} from "react-native";
import { supabase } from "./supabase";
import storage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

export const registerForPushNotification = async () => {
    //@ts-ignore
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
  
      const storageToken = await storage.getItem("expopushtoken");
      if (storageToken === null) {
        await storage.setItem("expopushtoken", token);
      }
      const newstoragetoken = await storage.getItem("expopushtoken");
      if (newstoragetoken !== null) {
        try {
            const {} = await supabase
            .from("profile")
            .update([{ pushtokens: token }])
            //@ts-ignore
            .match({ id: supabase.auth.user().id });
        } catch (error) {
            console.log(error)
        }
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };
