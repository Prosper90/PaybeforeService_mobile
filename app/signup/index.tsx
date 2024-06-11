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
import React, { useContext, useState } from "react";
import { Link } from "expo-router";
import { makeCall } from "../../utility/makeCall";
import { END_URL } from "../../utility/constants";
import { useRouter } from "expo-router";
import { DataContext } from "../../utility/context";
import { Notifier, NotifierComponents, Easing } from "react-native-notifier";
import * as SecureStore from "expo-secure-store";
import Loading from "../../components/Loading";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Import the useRouter hook
  const { setSignUpData } = useContext(DataContext);

  const RegandOtp = async () => {
    try {
      setLoading(true);
      const storedEmail = await SecureStore.getItemAsync("emailSignup");
      if (storedEmail === "" || storedEmail !== email) {
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
          setSignUpData((prev) => ({
            ...prev,
            email: email,
          }));
          await SecureStore.setItemAsync("emailSignup", String(email));
          ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
          router.push("/signup/otp"); // Navigate to the '/signup/otp' route
        } else {
          setLoading(false);
          //this is a warning
          Notifier.showNotification({
            title: "Email success",
            description: `${response?.message}`,
            Component: NotifierComponents.Notification,
            componentProps: {
              imageSource: require("../../assets/images/notifywarn.png"),
            },
            containerStyle: {
              paddingTop: 30,
            },
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            // onHidden: () => console.log('Hidden'),
            // onPress: () => console.log('Press'),
            hideOnPress: false,
          });
        }
      } else {
        const endpoint = `${END_URL}/auth/resendOtp`;

        const data = {
          email: email,
        };
        const headers = {
          "Content-Type": "application/json",
        };

        const response = await makeCall(endpoint, data, headers, "put");

        if (response.status) {
          setLoading(false);
          setSignUpData((prev) => ({
            ...prev,
            email: email,
          }));
          await SecureStore.setItemAsync("emailSignup", String(email));
          ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
          router.push("/signup/otp"); // Navigate to the '/signup/otp' route
        } else {
          setLoading(false);
          //this is a warning
          Notifier.showNotification({
            title: "Email Failed",
            description: `${response?.message}`,
            Component: NotifierComponents.Notification,
            componentProps: {
              imageSource: require("../../assets/images/notifywarn.png"),
            },
            containerStyle: {
              paddingTop: 30,
            },
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            // onHidden: () => console.log('Hidden'),
            // onPress: () => console.log('Press'),
            hideOnPress: false,
          });
        }
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#FAFAFA] items-center relative px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="mt-2 justify-start items-center h-4/5 pt-10">
        <Text className=" text-2xl font-medium my-3 text-[#0D0033]">
          What is your email?
        </Text>
        {/* <View className="flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-full my-4 px-5 w-full">
          <TextInput
            style={{ height: 60 }}
            placeholder="Enter phone email"
            className="w-full py-2 text-base pl-5"
            keyboardType="default"
            onChangeText={(newText) => setEmail(newText)}
            // defaultValue={text}
          />
        </View> */}
        <View className="flex-row items-center border border-[#DADADA] bg-[#F7F5FF]  rounded-md mb-4 px-4 w-full">
          <TextInput
            style={{ height: 60 }}
            placeholder="Enter Email address"
            className="w-full py-2 text-base "
            keyboardType="default"
            onChangeText={(newText) => setEmail(newText)}
            defaultValue={email}
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
        {loading ? (
          <Loading textSize="lg" textColor="#fff" loaderColor="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg p-3 ">Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
