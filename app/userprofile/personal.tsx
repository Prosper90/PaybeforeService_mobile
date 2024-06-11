/** @format */

import {
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import icons from "../../components/icons/Icons";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import { DataContext } from "../../utility/context";
import * as SecureStore from "expo-secure-store";
import Loading from "../../components/Loading";

export default function personal() {
  const { setUserProfile, userProfile } = useContext(DataContext);

  const [email, setEmail] = useState<string>();
  const [fullname, setFullName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateUser = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("tokenKey");
      if (email === "" || location === "" || phone === "") {
        ToastAndroid.show(
          `email and password cannot be empty`,
          ToastAndroid.SHORT
        );
        return;
      }
      setLoading(true);
      const endpoint = `${END_URL}/user/updateProfile`;
      console.log(endpoint, "checking endpoint");

      const data = {
        email: email,
        full_name: fullname,
        location: location,
        phone_number: phone,
      };
      const headers = {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, data, headers, "put");

      //   console.log(response, "omo oooh");
      if (response.status) {
        setLoading(false);
        ToastAndroid.show(`${response?.message}`, ToastAndroid.SHORT);
        // console.log(typeof response.token, "likeeeeee");
        setUserProfile(response.data);
        // await SecureStore.setItemAsync("tokenKey", String(response.token));
        // router.push("/home"); // Navigate to the '/signup/otp' route
      } else {
        setLoading(false);
        //this is a warning
        ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] px-4 justify-between py-16 gap-4">
      <View className="px-6 items-center justify-center ">
        <View className="border mb-5 mt-16 rounded-lg border-[#DADADA] bg-white p-4">
          <Text className="text-sm font-medium text-[#808080] px-5">
            Full Name
          </Text>
          <View className="flex-row items-center relative  rounded-md  px-6 ">
            <TextInput
              // style={{ height }}
              placeholder=""
              className="w-full  text-[#6E3EFF] text-lg font-semibold "
              // keyboardType=''
              onChangeText={(newText) => setFullName(newText)}
              defaultValue={`${userProfile?.full_name}`}
            />
            <MaterialCommunityIcons
              name="lock"
              size={24}
              className="m absolute  "
              // color="#808080"
            />
          </View>
        </View>
        <View className="border mb-5 rounded-lg border-[#DADADA] bg-white p-4">
          <Text className="text-sm font-medium text-[#808080] px-5">
            Email Address
          </Text>
          <View className="flex-row items-center relative  rounded-md  px-6 ">
            <TextInput
              // style={{ height }}
              placeholder=""
              className="w-full  text-[#6E3EFF] text-lg font-semibold "
              // keyboardType=''
              onChangeText={(newText) => setEmail(newText)}
              defaultValue={`${userProfile?.email}`}
            />
            <MaterialCommunityIcons
              name="lock"
              size={24}
              className="m absolute  "
              // color="#808080"
            />
          </View>
        </View>
        <View className="border mb-5 rounded-lg border-[#DADADA] bg-white p-4">
          <Text className="text-sm font-medium text-[#808080] px-5">
            Date of Birth
          </Text>
          <View className="flex-row items-center relative  rounded-md  px-6 ">
            <TextInput
              // style={{ height }}
              placeholder=""
              className="w-full  text-[#6E3EFF] text-lg font-semibold "
              // keyboardType=''
              onChangeText={(newText) => setPhone(newText)}
              defaultValue={`${userProfile?.phone}`}
            />
            <MaterialCommunityIcons
              name="lock"
              size={24}
              className="m absolute  "
              // color="#808080"
            />
          </View>
        </View>
        <View className="border mb-5 rounded-lg border-[#DADADA] bg-white p-4">
          <Text className="text-sm font-medium text-[#808080] px-5">
            Location
          </Text>
          <View className="flex-row items-center relative  rounded-md  px-6 ">
            <TextInput
              // style={{ height }}
              placeholder=""
              className="w-full  text-[#6E3EFF] text-lg font-semibold "
              // keyboardType=''
              onChangeText={(newText) => setLocation(newText)}
              defaultValue={`${userProfile?.location}`}
            />
            <MaterialCommunityIcons
              name="refresh"
              size={24}
              className="m absolute  "
              // color="#808080"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={updateUser}
        className="border-2   bg-[#6E3EFF] rounded-full mt-2  border-white"
      >
        {loading ? (
          <Loading textSize="lg" textColor="#fff" loaderColor="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg p-3 ">Login</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
