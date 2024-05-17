/** @format */

import {
  Image,
  Platform,
  SafeAreaView,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import icons from "./icons/Icons";
import { downloadReceipt } from "../utility/constants";
import ViewShot from "react-native-view-shot";

export default function ShowDownload() {
  const viewShotRef = useRef<ViewShot>(null);

  const handleShareImage = async () => {
    await downloadReceipt("image", viewShotRef);
  };

  const handleSharePDF = async () => {
    await downloadReceipt("pdf", viewShotRef);
  };

  return (
    <KeyboardAwareScrollView className="flex-1 bg-[#fafafa] ">
      <View className="p-5" ref={viewShotRef}>
        <Text className="text-[#555555] text-base">
          Enter the redemption code sent to you to receive this payment in your
          main wallet.
        </Text>

        <View className="p-5 border border-[#DADADA] mt-5 rounded-2xl">
          <View className="flex-row items-center gap-4">
            <Image
              source={icons.tableSvg}
              className={`${Platform.OS === "ios" && "h-10 w-10"} h-14 w-14`}
            />
            <Text className="text-base font-medium text-[#000]">
              Received from client
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Full Name
            </Text>
            <Text className="text-base font-medium text-[#000]">Anonymous</Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Date</Text>
            <Text className="text-base font-medium text-[#000]">26/7/2023</Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Time</Text>
            <Text className="text-base font-medium text-[#000]">2.30PM</Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">
              Transaction ID
            </Text>
            <Text className="text-base font-medium text-[#000]">
              567773DTYY373
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Status</Text>
            <Text className="text-base font-medium text-[#A23EFF] ">
              <View className="p-1 bg-[#A23EFF] rounded-full"></View> Pending
            </Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Note</Text>
            <Text className="text-base font-medium text-[#000]">-</Text>
          </View>
          <View className="flex-row items-center gap-4 justify-between mt-2 px-2">
            <Text className="text-base font-normal text-[#555555]">Amount</Text>
            <Text className="text-base font-medium text-[#A23EFF]">
              ₦30,000
            </Text>
          </View>
        </View>
        <Text className="mt-5 mx-1 font-semibold text-[#555555] text-sm">
          Enter code
        </Text>

        <TouchableOpacity className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white">
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

//08066294253
