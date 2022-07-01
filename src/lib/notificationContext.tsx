import { createContext, useState } from "react";
import { supabase } from "./supabase";

interface notProps {
  notification?: [];
  handleFetchNotifications?: any;
}

export const notificationContext = createContext<notProps>({});

export const NotificationProvider = ({ children }: any) => {
  const [notification, setNotification] = useState<any>();

  const handleFetchNotifications = async (): Promise<any> => {
    const { data: notificationsData, error: notificationsError } =
      await supabase
        .from("notifications")
        .select("title, description, id, created_at")
        .order("id", { ascending: false })
        .limit(10);

    return setNotification(notificationsData);
  };

  return (
    <notificationContext.Provider
      value={{ notification, handleFetchNotifications }}
    >
      {children}
    </notificationContext.Provider>
  );
};
