/** @format */

import {
  Image,
  Modal,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";

import icons from "./icons/Icons";

export default function GLinkModal({
  paymentModal,
  setPaymentModal,
  paymentId,
  paymentLink,
}: any) {
  const textToCopy = "https://www.example.com/randht";
  const textToLink = "https://www.example.com/randht";

  const copyToClipboard = async (linkCopied: any) => {
    try {
      await Clipboard.setStringAsync(linkCopied);

      // Show a toast message indicating that the text has been copied
      ToastAndroid.showWithGravity(
        "Text copied to clipboard",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("Clipboard copy error:", error);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={paymentModal}
      onRequestClose={() => {
        setPaymentModal(!paymentModal);
      }}
    >
      <View className="flex-1 px- bg-[#00000056] px-5 relative justify-center">
        <View className=" px-6 pt-5 pb-6 rounded-2xl  bg-white ">
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-base font-semibold text-black`}
          >
            Here is the link to receive your payments
          </Text>
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } text-base font-normal  my-2 text-[#555555]`}
          >
            Copy this link and send it to the people from whom you want to
            receive payment. Also, don't forget to save it in case you want to
            use it later
          </Text>
          <View className="mt-3">
            <Text className="mb-2 font-semibold text-[#555555] text-sm">
              Payment link
            </Text>
            <View className="flex-row border border-[#DADADA] bg-white p-4 rounded-xl justify-between">
              <Text className="font-medium text-[#555555] text-base">
                {textToCopy}
              </Text>
              <TouchableOpacity onPress={() => copyToClipboard(paymentId)}>
                <Image source={icons.link} className="h-5 w-5" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-3">
            <Text className="mb-2 font-semibold text-[#555555] text-sm">
              Payment ID
            </Text>
            <View className="flex-row border border-[#DADADA] bg-white p-4 rounded-xl justify-between">
              <Text className="font-medium text-[#555555] text-base">
                {textToLink}
              </Text>
              <TouchableOpacity onPress={() => copyToClipboard(paymentLink)}>
                <Image source={icons.link} className="h-5 w-5" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setPaymentModal(!true)}
            className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
          >
            <Text className="text-white font-bold text-lg p-3 ">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
