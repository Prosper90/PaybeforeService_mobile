/** @format */

import { Tabs } from "expo-router/tabs";
import { Image, Platform, Text, View } from "react-native";
import icons from "../../components/icons/Icons";
import { SuccessPayment } from "../../components/SvgItems";
import SuccessPaymentModal from "../../components/SuccessPaymentModal";
export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 70,
        },
      }}
    >
      <Tabs.Screen
        // Name of the route to hide.
        name="home"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View className="items-center justify-center">
                <Image
                  source={!focused ? icons.home : icons.homeOutline}
                  className="h-24 w-24"
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
                <Text
                  className={`${focused ? "text-[#6E3EFF]" : "text-[#555555]"}`}
                >
                  Home
                </Text>
              </View>
            );
          },
          // This tab will no longer show up in the tab bar.
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="transaction"
        options={{
          headerShown: true,
          headerStyle: false,
          headerTitleAlign: "center",
          headerStatusBarHeight: 30,
          headerTintColor: "#000",
          headerTitle: "Transactions",
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View className="items-center justify-center">
                <Image
                  source={!focused ? icons.trans : icons.transOutline}
                  className="h-24 w-24"
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
                <Text
                  className={`${focused ? "text-[#6E3EFF]" : "text-[#555555]"}`}
                >
                  Transactions
                </Text>
              </View>
            );
          },
          // This tab will no longer show up in the tab bar.
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="referrals"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStatusBarHeight: 30,
          headerTitle: "Referrals",
          headerTintColor: "#000",
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View className="items-center justify-center">
                <Image
                  source={!focused ? icons.referral : icons.referralOutine}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  className={`${focused ? "text-[#6E3EFF]" : "text-[#555555]"}`}
                >
                  Referrals
                </Text>
              </View>
            );
          },
          // This tab will no longer show up in the tab bar.
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="dispute"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStatusBarHeight: 30,
          headerTitle: "Disputes",
          headerTintColor: "#000",
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View className="items-center justify-center">
                <Image
                  source={!focused ? icons.dispute : icons.disputeOutline}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  className={`${focused ? "text-[#6E3EFF]" : "text-[#555555]"}`}
                >
                  Disputes
                </Text>
              </View>
            );
          },
          // This tab will no longer show up in the tab bar.
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="profile"
        options={{
          headerShown: true,
          title: "",
          headerTitle: "Settings",
          headerTitleAlign: "center",
          headerTintColor: "#000",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View className="items-center justify-center">
                <Image
                  source={!focused ? icons.profile : icons.profileOutline}
                  className="h-24 w-24"
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
                <Text
                  className={`${focused ? "text-[#6E3EFF]" : "text-[#555555]"}`}
                >
                  Profile
                </Text>
              </View>
            );
          },
          // This tab will no longer show up in the tab bar.
        }}
      />
      {/* <SuccessPaymentModal /> */}
    </Tabs>
  );
}
