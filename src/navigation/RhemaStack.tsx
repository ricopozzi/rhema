import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationsScreen } from "../pages/NotificationsScreen";
import { Rhema } from "../pages/Rhema";

const { Navigator, Screen } = createNativeStackNavigator();

export const RhemaStack = () => {
  return (
    //@ts-ignore
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen component={Rhema} name='Bible' />
      <Screen component={NotificationsScreen} name='Notifications' />
    </Navigator>
  );
};
