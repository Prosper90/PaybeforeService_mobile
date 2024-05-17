/** @format */

import { Platform, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataContext } from "../utility/context";

const DashboardBalance = () => {
  const { userProfile } = useContext(DataContext);
  const [hideWallet, setHideWallet] = useState<boolean>(false);

  const toggleShowAccount = () => {
    setHideWallet(!hideWallet);
  };
  return (
    <View className="gap-4 px-4 ml-1 mt-2">
      <View
        className={`${
          Platform.OS === "ios" && "py-7"
        } bg-[#6E3EFF] overflow-hidden relative flex-row justify-between items-center rounded-3xl p-6 py-10`}
      >
        <View>
          <Text className="text-xs font-semibold text-white">
            Main Wallet Balance
          </Text>
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } font-bold text-white text-base`}
          >
            {hideWallet
              ? "* * * *"
              : `₦${userProfile?.balances.main_wallet?.toFixed(2)}`}
          </Text>
        </View>
        <View className="h-8 w-28 bg-[#ffffff18] absolute right-0 bottom-0">
          <View className="h-6 w-24 bg-[#FFFFFF33] absolute right-0 bottom-0"></View>
        </View>
        <View>
          {/* <MaterialCommunityIcons
            name={"eye-off"}
            size={24}
            className="m absolute  "
            color="#fff"
          /> */}
          <MaterialCommunityIcons
            name={hideWallet ? "eye-off" : "eye"}
            size={24}
            className="m absolute  "
            color="#FFF"
            onPress={toggleShowAccount}
          />
        </View>
      </View>

      <View
        className={`${
          Platform.OS === "ios" && "py-7"
        } bg-[#fff] relative overflow-hidden shadow-sm border border-[#DADADA] flex-row justify-between items-center  rounded-3xl p-6 py-10`}
      >
        <View>
          <Text
            className={`${
              Platform.OS === "ios" && "text-xs"
            }  font-semibold text-black`}
          >
            Pending Wallet Balance
          </Text>
          <Text
            className={`${
              Platform.OS === "ios" && "text-sm"
            } font-bold text-black text-base`}
          >
            {hideWallet
              ? "* * * *"
              : `₦${userProfile?.balances.pending_wallet?.toFixed(2)}`}
          </Text>
        </View>

        <View className="h-28 w-32 bg-[#a23eff5f] rounded-full absolute -right-12 -bottom-20">
          <View className="h-28 w-28 bg-[#a23eff56] rounded-full absolute right-7 bottom-3"></View>
        </View>
        <View>
          {/* <MaterialCommunityIcons
            name={"eye-off"}
            size={24}
            className="m absolute  "
            color="#000"
          /> */}
          <MaterialCommunityIcons
            name={hideWallet ? "eye-off" : "eye"}
            size={24}
            className="m absolute  "
            // color="#808080"
            onPress={toggleShowAccount}
          />
        </View>
      </View>
    </View>
  );
};

export default DashboardBalance;
