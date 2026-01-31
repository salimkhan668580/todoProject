import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from 'react-native-toast-message';


import { useColorScheme } from "@/hooks/use-color-scheme";
import RootNavigator from "./RootNavigation";

import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import { store } from "./store/store";
import { Provider } from 'react-redux';


export default function RootLayout() {
  const colorScheme = useColorScheme();
    const queryClient = new QueryClient()

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
       
  <QueryClientProvider client={queryClient}>
 <Provider store={store}>

      <RootNavigator />
 </Provider>
  </QueryClientProvider>
     
      <StatusBar style="auto" />
       <Toast />
    </ThemeProvider>
  );
}
