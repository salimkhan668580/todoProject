import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from 'react-redux';

import { useColorScheme } from "@/hooks/use-color-scheme";
import RootNavigator from "./RootNavigation";
import { store } from "./store/store";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider store={store}>

      <RootNavigator />
        </Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
