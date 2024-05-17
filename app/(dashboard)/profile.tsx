/** @format */

import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import icons from "../../components/icons/Icons";
import { Link, router } from "expo-router";
import { DataContext } from "../../utility/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function profile() {
  const { userProfile } = useContext(DataContext);

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] px-6">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View
        className={`${
          Platform.OS === "ios" ? "" : ""
        }  items-center justify-center px-4`}
      >
        <View>
          <View className="items-center mt-5 ">
            <View className="border m-1 border-[#6E3EFF] rounded-full mx-2">
              {/* <Text className="text-[60px]">😎</Text> */}
              <MaterialCommunityIcons
                name="account"
                size={32}
                className=""
                color="#6E3EFF"
                // onPress={goBack}
              />
            </View>
            <Text className="text-[#6E3EFF] font-bold text-xl">
              {userProfile?.username}
            </Text>
          </View>
        </View>
      </View>
      <View className="gap-4 mt-5 px-6">
        <TouchableOpacity
          onPress={() => router.push("/userprofile/personal")}
          className="flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5"
        >
          <View className="flex-row gap-4 items-center justify-between">
            <Image source={icons.profileMenu} className="h-10 w-10" />
            <Text
              className={`${
                Platform.OS === "ios" && "text-base"
              } text-lg font-medium`}
            >
              Personal Information
            </Text>
          </View>
          <Image source={icons.arrowRight} className="h-5 w-5" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/userprofile/password")}
          className="flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5"
        >
          <View className="flex-row gap-4 items-center justify-between">
            <Image source={icons.bank} className="h-10 w-10" />
            <Text
              className={`${
                Platform.OS === "ios" && "text-base"
              } text-lg font-medium`}
            >
              Password
            </Text>
          </View>
          <Image source={icons.arrowRight} className="h-5 w-5" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/userprofile/pin")}
          className="flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5"
        >
          <View className="flex-row gap-4 items-center justify-between">
            <Image source={icons.secure} className="h-10 w-10" />
            <Text
              className={`${
                Platform.OS === "ios" && "text-base"
              } text-lg font-medium`}
            >
              Pin
            </Text>
          </View>
          <Image source={icons.arrowRight} className="h-5 w-5" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/userprofile/contact")}
          className="flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5"
        >
          <View className="flex-row gap-4 items-center justify-between">
            <Image source={icons.contact} className="h-10 w-10" />
            <Text
              className={`${
                Platform.OS === "ios" && "text-base"
              } text-lg font-medium`}
            >
              Contact us
            </Text>
          </View>
          <Image source={icons.arrowRight} className="h-5 w-5" />
        </TouchableOpacity>
        {/* <TouchableOpacity className="flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5">
          <View className="flex-row gap-4 items-center justify-between">
            <Image source={icons.notify} className="h-10 w-10" />
            <Text
              className={`${
                Platform.OS === "ios" && "text-base"
              } text-lg font-medium`}
            >
              Notifications
            </Text>
          </View>
          <Image source={icons.arrowRight} className="h-5 w-5" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
