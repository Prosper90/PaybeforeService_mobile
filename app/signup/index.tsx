/** @format */

import {
  Button,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { makeCall } from "../../utility/makeCall";
import { END_URL } from "../../utility/constants";
import { useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Import the useRouter hook

  const RegandOtp = async () => {
    try {
      setLoading(true);
      const endpoint = `${END_URL}/auth/sendOtp`;

      const data = {
        email: email,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, data, headers, "post");

      if (response.status) {
        setLoading(false);
        ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
        router.push("/signup/otp"); // Navigate to the '/signup/otp' route
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
    <View className="flex-1 bg-[#FAFAFA] items-center relative px-8">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="mt-2 justify-center items-center h-4/5">
        <Text className=" text-2xl font-medium mt-3">What is your email?</Text>
        <View className="flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-full my-4 px-5 w-full">
          <TextInput
            style={{ height: 60 }}
            placeholder="Enter phone email"
            className="w-full py-2 text-base pl-5"
            keyboardType="default"
            onChangeText={(newText) => setEmail(newText)}
            // defaultValue={text}
          />
        </View>
        <Text className="text-center text-[#555] text-base">
          We will use this email to contact you if the need arises
        </Text>
      </View>
      <TouchableOpacity
        onPress={RegandOtp}
        className="border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white"
      >
        <Text className="text-white font-bold text-lg p-3 ">
          {loading ? "Loading..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
