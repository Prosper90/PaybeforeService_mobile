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
import { DataContext } from "../../utility/context";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import * as SecureStore from "expo-secure-store";

export default function pin() {
  const { setUserProfile, userProfile } = useContext(DataContext);

  const [oldPin, setOldPin] = useState<string>();
  const [newPin, setNewPin] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  // const router = useRouter();

  const updatePin = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("tokenKey");

      if (userProfile?.pin !== oldPin) {
        ToastAndroid.show(`Old pin doesnt match`, ToastAndroid.SHORT);
        return;
      }
      setLoading(true);
      const endpoint = `${END_URL}/user/UpdatePin`;
      console.log(endpoint, "checking endpoint");

      const data = {
        old_pin: oldPin ? parseInt(oldPin, 10) : null,
        new_pin: newPin ? parseInt(newPin, 10) : null,
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
            Old Pin
          </Text>
          <View className="flex-row items-center relative  rounded-md  px-6 ">
            <TextInput
              // style={{ height }}
              placeholder=""
              className="w-full  text-[#6E3EFF] text-lg font-semibold "
              // keyboardType=''
              onChangeText={(newText) => setOldPin(newText)}
              //   defaultValue="Lord Gaga"
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
            New Pin
          </Text>
          <View className="flex-row items-center relative  rounded-md  px-6 ">
            <TextInput
              // style={{ height }}
              placeholder=""
              className="w-full  text-[#6E3EFF] text-lg font-semibold "
              // keyboardType=''
              onChangeText={(newText) => setNewPin(newText)}
            />
            <MaterialCommunityIcons
              name="lock"
              size={24}
              className="m absolute  "
              // color="#808080"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={updatePin}
        className="border-2   bg-[#6E3EFF] rounded-full mt-2  border-white"
      >
        <Text className="text-white font-bold text-center text-lg p-3 ">
          {!loading ? "Update" : "Loading..."}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
