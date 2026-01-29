import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginPage from "../components/auth/Login";
import TabNavigator, { TabParamList } from "./MainTabs";
import PreviousTodoList from "../components/todo/PreviousTodoList";
import NotificationScreen from "../Layout/NotificationScreen";


export type RootStackParamList = {
  Login: undefined;
  ForgetPassword: undefined;
  TodoList:undefined;
  Notification:undefined;

  MainTabs: { screen?: keyof TabParamList } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          id="RootStack"
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="TodoList" component={PreviousTodoList} />
          <Stack.Screen
  name="Notification"
  component={NotificationScreen}
/>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
