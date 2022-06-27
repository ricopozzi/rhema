import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Bible } from "../pages/Bible";
import { BibleProvider } from "../lib/useBible";
import { ChapterScreen } from "../pages/ChapterScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export const BibleStack = () => {
  return (
    <BibleProvider>
      {/*@ts-ignore*/}
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen component={Bible} name='Bible' />
        <Screen component={ChapterScreen} name='Chapter' />
      </Navigator>
    </BibleProvider>
  );
};
