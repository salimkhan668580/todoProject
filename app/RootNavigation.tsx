// navigation/RootNavigator.tsx
import { NavigationContainer } from "@react-navigation/native";
import AdminNavigation from "./admin/navigation/AdminNevigation";
import AuthNavigator from "./AuthNavigation";
import { useAppSelector, } from "./store/hook";
import AppNavigation from "./navigation/AppNevigation";


export default function RootNavigator() {
const user = useAppSelector(state => state.user.value);

  if (!user) return <AuthNavigator />;

  if (user === "admin@gmail.com") {
    return <AdminNavigation />;
  }
    return <AppNavigation />;

//   return <AdminNavigation/>;

}
