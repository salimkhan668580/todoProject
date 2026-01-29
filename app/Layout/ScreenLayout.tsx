import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

type ScreenLayoutProps = {
  children: React.ReactNode;
  customHeader?: React.ReactNode;
};

export default function ScreenLayout({
  children,
  customHeader,
}: ScreenLayoutProps) {
  return (
    <LinearGradient
      colors={["#F7F8FC", "#EEF1F8", "#E6ECF5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Header />

        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
paddingTop:20,
paddingHorizontal:10
  },
});
