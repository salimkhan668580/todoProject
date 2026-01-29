import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/AppNevigation";

import { useNavigation, type NavigationProp } from "@react-navigation/native";


const TEXT_PRIMARY = "#111827";
const TEXT_SECONDARY = "#6B7280";
const BG = "#F8FAFC";

export default function Header() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Left */}
      <View style={styles.left}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/100?img=12",
          }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>Diavanda Domenic</Text>
          <Text style={styles.workspace}>Mariposa’s Workspace</Text>
        </View>
      </View>

      {/* Right */}
      <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8} onPress={()=>navigation.navigate("Notification")} >
        <FontAwesome6 name="bell" size={20} color={TEXT_PRIMARY} />
        <View style={styles.dot} />
      </TouchableOpacity>


    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#DC2626",
    backgroundColor:BG,
    paddingHorizontal: 20,
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  name: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },

  workspace: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginTop: 2,
  },

  iconBtn: {
    padding: 8,
    position: "relative",
  },

  dot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
});
