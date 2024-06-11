/** @format */

import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import OtpInput from "../../components/OtpInput";
import { Link, router } from "expo-router";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import { Notifier, NotifierComponents, Easing } from "react-native-notifier";

export default function otp() {
  const [otp, setOtp] = useState(""); // Initialize with an empty string
  const [loading, setLoading] = useState<boolean>(false);
  // Define your onChange function to update the 'otp' state
  // const onChange = (value: string) => setOtp(value);

  const onChange = async (value: string) => {
    try {
      //   console.log(value, "checking the value");
      setOtp(value);

      if (value.length === 6) {
        // console.log("far passed");

        setLoading(true);
        const endpoint = `${END_URL}/auth/verifyOtpReg`;

        const data = {
          otp: parseInt(value),
        };
        const headers = {
          "Content-Type": "application/json",
        };

        const response = await makeCall(endpoint, data, headers, "post");
        //   console.log(response, "omo oooh");
        if (response.status) {
          setLoading(false);

          Notifier.showNotification({
            title: "Otp",
            description: `${response.message}`,
            Component: NotifierComponents.Notification,
            componentProps: {
              imageSource: require("../../assets/images/notifysuccess.png"),
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
          router.push("/signup/username");
        } else {
          setLoading(false);
          //this is a warning
          Notifier.showNotification({
            title: "Otp",
            description: `${response.message}`,
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
        <Text className=" text-2xl text-center font-medium my-3 text-[#0D0033]">
          Enter the six-digit code we sent to you
        </Text>
        <OtpInput value={otp} valueLength={6} onChange={onChange} />
      </View>
      {/* <TouchableOpacity 
			 className='border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
					<Text className='text-white font-bold text-lg p-3 '>
						Continue
					</Text>
			</TouchableOpacity> */}
    </View>
  );
}
