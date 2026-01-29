import { RootStackParamList } from "@/app/navigation/AppNevigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ScreenLayout from "../../Layout/ScreenLayout";

type SettingItemProps = {
  icon: string;
  label: string;
  sublabel?: string;
  color: string;
  onPress: () => void;
};

function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScreenLayout>
      <ScrollView
        style={styles.main}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --- 1. USER PROFILE HEADER --- */}
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=diavanda" }}
              style={styles.profileImage}
            />
            <LinearGradient
              colors={["#A2F3FF", "#CBBAFF"]}
              style={styles.editBadge}
            >
              <MaterialCommunityIcons name="pencil" size={14} color="#2D3142" />
            </LinearGradient>
          </View>
          <Text style={styles.userName}>Diavanda Domenic</Text>
          <Text style={styles.userEmail}>diavanda.d@design.com</Text>
        </View>

        {/* --- 2. THEMED STATS ROW --- */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View
              style={[styles.statIconCircle, { backgroundColor: "#F3E5F5" }]}
            >
              <MaterialCommunityIcons
                name="check-all"
                size={20}
                color="#8B5CF6"
              />
            </View>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[styles.statIconCircle, { backgroundColor: "#E0F7FA" }]}
            >
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="#00BFA5"
              />
            </View>
            <Text style={[styles.statNumber, { color: "#00BFA5" }]}>12</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* --- 3. ACCOUNT DATA SECTION --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account Data</Text>

          <SettingItem
            icon="history"
             color="#8B5CF6"
            label="All Previous Todo"
            onPress={() => navigation.navigate("TodoList")}
            sublabel="View your task history"
          />
          <SettingItem
            icon="bell-ring-outline"
            label="Notifications"
            color="#14B8A6"
            onPress={() => navigation.navigate("TodoList")}
            sublabel="Mute or change alerts"
          />
          <SettingItem
            icon="palette-swatch-outline"
            label="App Theme"
            color="#8B5CF6"
            onPress={() => navigation.navigate("TodoList")}
            sublabel="Teal & Purple Sky"
          />
        </View>

        {/* --- 4. THEMED LOGOUT --- */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <LinearGradient
            colors={["#A2F3FF", "#CBBAFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <MaterialCommunityIcons
              name="logout"
              size={22}
              color="#2D3142"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.logoutText}>Logout Session</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
}

// Custom Component for Items
const SettingItem = ({
  icon,
  label,
  sublabel,
  color,
  onPress,
}: SettingItemProps) => (
  <TouchableOpacity
    style={styles.settingItem}
    activeOpacity={0.6}
    onPress={onPress}
  >
    <View style={[styles.iconCircle, { backgroundColor: color + "40" }]}>
      <MaterialCommunityIcons name={icon as any} size={22} color={color} />
    </View>
    <View style={styles.settingTextContainer}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingSubLabel}>{sublabel}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color="#CCC" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#F9FFFF" },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  // Header
  profileHeader: { alignItems: "center", marginVertical: 35 },
  imageContainer: { position: "relative", marginBottom: 15 },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#FFF",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  userName: { fontSize: 24, fontWeight: "800", color: "#2D3142" },
  userEmail: { fontSize: 14, color: "#888", marginTop: 4, fontWeight: "500" },

  // Stats
  statsRow: { flexDirection: "row", gap: 15, marginBottom: 25 },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  statIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statNumber: { fontSize: 22, fontWeight: "800", color: "#CBBAFF" },
  statLabel: {
    fontSize: 12,
    color: "#AAA",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Settings Section
  sectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 28,
    padding: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2D3142",
    marginBottom: 22,
  },
  settingItem: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingTextContainer: { flex: 1 },
  settingLabel: { fontSize: 16, color: "#2D3142", fontWeight: "700" },
  settingSubLabel: { fontSize: 12, color: "#BBB", marginTop: 2 },

  // Logout
  logoutBtn: { marginTop: 10 },
  gradientBtn: {
    flexDirection: "row",
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#CBBAFF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutText: { color: "#2D3142", fontSize: 16, fontWeight: "800" },
});

export default ProfileScreen;
