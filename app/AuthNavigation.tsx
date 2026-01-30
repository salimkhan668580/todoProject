import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginPage from "./components/auth/Login";



export type RootStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthNavigator() {
    
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


        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
