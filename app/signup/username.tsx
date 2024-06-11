import React, { useContext, useState } from "react";
import { DataContext } from "../../utility/context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function username() {
  const [username, setUserName] = useState<string>("");
  const { setSignUpData } = useContext(DataContext);

  const goNext = () => {
    setSignUpData((prev) => ({
      ...prev,
      username: username,
    }));
    router.push("/signup/date");
  };

  return (
    <View className="flex-1 bg-[#FAFAFA] items-center relative px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <View className="mt-2 justify-start items-center h-4/5 pt-10">
        <Text className=" text-2xl font-medium my-3 text-[#0D0033]">
          What will you like to be called?
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
            placeholder="Enter Username"
            className="w-full py-2 text-base "
            keyboardType="default"
            onChangeText={(newText) => setUserName(newText)}
            defaultValue={username}
          />
        </View>
        <Text className="text-center text-[#555] text-base">
          This is how you will appear on Swiftsettle and you will not be able to
          change it
        </Text>
      </View>

      {/* <TouchableOpacity
        onPress={goNext}
        className="border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white"
      >
        <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={goNext}
        className="border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white"
      >
        <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
