import { Entypo } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import AdminHome from "../components/AdminHome";
import AdminProfileScreen from "../components/AdminProfileScreen";



export type AdminTabParamList = {
Home: undefined;

Profile: undefined;
};

const Tab = createBottomTabNavigator<AdminTabParamList>();

export default function AdminTabNavigator() {
  return (
    <Tab.Navigator
      id="AdminTabs"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C3AED",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />

    
      <Tab.Screen
        name="Profile"
        component={AdminProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
