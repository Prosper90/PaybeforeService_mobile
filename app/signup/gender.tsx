/** @format */

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Link, router } from "expo-router";
import { DataContext } from "../../utility/context";

export default function gender() {
  const [gender, setGender] = useState<string>("");
  const { setSignUpData } = useContext(DataContext);

  const goNext = () => {
    setSignUpData((prev) => ({
      ...prev,
      gender: gender,
    }));
    router.push("/signup/pin");
  };

  return (
    <View className="flex-1 bg-[#FAFAFA] items-center relative px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="mt-2 justify-start items-center h-4/5 pt-10">
        <Text className=" text-2xl text-center  font-medium my-3  text-[#0D0033]">
          What is your Gender
        </Text>
        <View className="my-4 w-96 px-6 pr-[3px] items-center">
          <TouchableOpacity
            onPress={() => setGender("woman")}
            className="flex-row items-start justify-start gap-3 border border-[#DADADA] bg-[#F7F5FF]  rounded-lg my-4 pt-3 pb-5 px-5 w-full"
          >
            <View
              className={`${
                gender === "woman" ? " border-[#6E3EFF]" : " border-gray-400"
              } border-4 rounded-full p-1 px-1 bg-white`}
            ></View>
            <Text>Woman</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender("man")}
            className="flex-row items-start justify-start gap-3 border border-[#DADADA] bg-[#F7F5FF]  rounded-lg my-4 pt-3 pb-5 px-5 w-full"
          >
            <View
              className={`${
                gender === "man" ? " border-[#6E3EFF]" : " border-gray-400"
              } border-4 rounded-full p-1 px-1 bg-white`}
            ></View>
            <Text>Man</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-[#555] text-base">
          You must be atleast 18years to use Swiftsettle
        </Text>
      </View>
      <TouchableOpacity
        onPress={goNext}
        className="border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white"
      >
        <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
