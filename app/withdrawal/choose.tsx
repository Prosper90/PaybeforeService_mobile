import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import icons from "../../components/icons/Icons";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

export default function choose() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>();

  const select = (type: string) => {
    setSelected(type);
  };

  return (
    <View className="flex-1 bg-white px-5">
      <View className="flex flex-col h-[90%] justify-between items-center w-[100%]">
        <View className="w-100 px-5">
          <TouchableOpacity
            onPress={() => select("bankDetails")}
            className={`border ${
              selected === "bankDetails"
                ? "border-[#6E3EFF]"
                : "border-[#DADADA]"
            } mt-6 py-4 px-[100px] rounded-full`}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              source={icons.addbank}
              className={`${Platform.OS === "ios" && "h-12 w-12"} h-14 w-14`}
            />
            <View className="ml-3 w-28 ">
              <Text className="text-black font-semibold text-lg whitespace-nowrap ">
                New Bank Account
              </Text>
              <Text className="text-[#555555] font-normal text-base whitespace-nowrap">
                Send to a new account
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => select("saved")}
            className={`border ${
              selected === "saved" ? "border-[#6E3EFF]" : "border-[#DADADA]"
            } flex  flex-row justify-start items-center mt-6 py-4 px-[100px] rounded-full w-[100%]`}
          >
            <Image
              source={icons.addbank}
              className={`${Platform.OS === "ios" && "h-12 w-12"} h-14 w-14`}
            />
            <View className="ml-3 w-28">
              <Text className="text-black font-semibold text-lg ">
                Beneficiaries
              </Text>
              <Text className="text-[#555555] font-normal text-base whitespace-nowrap">
                Send to a saved account
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`withdrawal/${selected}`)}
          className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
