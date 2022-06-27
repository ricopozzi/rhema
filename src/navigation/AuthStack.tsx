import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "../pages/LoginPage";
import { SignUp } from "../pages/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    //@ts-ignore
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen component={LoginPage} name='LoginPage' />
      <Screen component={SignUp} name='SignUpPage' />
    </Navigator>
  );
};
