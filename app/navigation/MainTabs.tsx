import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo} from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreen from "../components/Home/HomeScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import ProfileScreen from "../components/profile/ProfileScreen";
import TodoScreen from "../components/todo/TodoScreen";

export type TabParamList = {
  Home: undefined;
  Todo: undefined;
  Profile: undefined;

};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
   const insets = useSafeAreaInsets();
  return (
 <Tab.Navigator
      id="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C3AED",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",

          paddingTop: 5,
          paddingBottom: insets.bottom + 5, // 👈 KEY FIX
          height: 60 + insets.bottom,       // 👈 KEY FIX
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-task" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
   

      
    </Tab.Navigator>
  );
}