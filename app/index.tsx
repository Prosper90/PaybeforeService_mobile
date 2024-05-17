/** @format */

import {
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function home() {
  const image = {
    uri: "https://res.cloudinary.com/daxwxuboe/image/upload/v1696145185/bg.png",
  };

  return (
    <View className="flex-1 items-center relative justify-center bg-white">
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="flex-1 bg-cover w-full items-center justify-center"
      >
        {/* <StatusBar style="auto" /> */}

        <Image
          className="h-2/5 w-3/5 mb-5 object-contain"
          source={require("../assets/images/phone.png")}
        />
        <Text className="text-white text-4xl font-bold">PayBeforeService</Text>
        <Text className="text-white text-2xl text-center">
          Simplified Payment Processing with an Escrow Approach
        </Text>
        <View className="flex-row gap-5 absolute bottom-10 mr-2">
          <TouchableOpacity className="border-2 items-center  justify-center bg-white rounded-full w-36 border-white">
            <Link className="py-3" href="/login">
              <Text className="text-[#6E3EFF] font-bold text-lg p-3 ">
                Login
              </Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity className="border-2 items-center rounded-full w-36 border-white">
            <Link className="py-3" href="/signup">
              <Text className="text-white font-bold text-lg p-3 ">Sign Up</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
