import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import NotificationScreen from "../../Layout/NotificationScreen";
import  { AdminTabParamList } from "./AdminTabs";
import AdminTabNavigator from "./AdminTabs";
import ChildrenDetails from "../components/ChidrenDetails/ChildrenDetails";
import PreviousTodoList from "../components/ChidrenDetails/PreviousTodoList";
import Stats from "../components/ChidrenDetails/Stats";
import TaskReminder from "../components/taskReminder/TaskReminder";
import NotificationHistory from "../components/taskReminder/NotificationHistory";

export type RootStackParamList = {


  TodoList: undefined;
  stats: undefined;
  taskReminder: undefined;
  TaskDetails: undefined | { userId: string };
  PreviousTodoList: undefined | {userId:string};
  Notification: undefined;
  NotificationHistory: undefined;
  
  ChildrenDetails: { userId: string }; 

  AdminTabs: { screen?: keyof AdminTabParamList } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AdminNavigation() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          id="RootStack"
          initialRouteName="AdminTabs"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="TodoList" component={PreviousTodoList} /> */}
          <Stack.Screen name="stats" component={Stats} />
          <Stack.Screen name="taskReminder" component={TaskReminder} />
          <Stack.Screen name="TaskDetails" component={ChildrenDetails} />
          <Stack.Screen name="PreviousTodoList" component={PreviousTodoList} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="NotificationHistory" component={NotificationHistory} />
          <Stack.Screen
            name="AdminTabs"
            component={AdminTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
