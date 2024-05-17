import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { NotifyError, NotifySuccess, NotifyWarn } from "./SvgItems";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  container: {
    padding: 20,
  },
  title: { color: "#555555", fontWeight: "bold" },
  description: { color: "#555555" },
});

export const Notify = ({ title, description, notifyType }: any) => (
  <SafeAreaView className="bg-[#fff] text-[#000] font-xs shadow-lg flex justify-start gap-2">
    {notifyType === "success" ? (
      <NotifySuccess />
    ) : notifyType === "warn" ? (
      <NotifyWarn />
    ) : (
      <NotifyError />
    )}
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </SafeAreaView>
);
