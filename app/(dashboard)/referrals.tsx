/** @format */

import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  // Clipboard,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useContext, useEffect, useState } from "react";
import icons from "../../components/icons/Icons";
import DataTable from "../../components/DataTable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateBox from "../../components/DateBox";
import referData from "../../utility/referData.json";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { ReferralBonus, UserProfileData } from "../../utility/types";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import * as SecureStore from "expo-secure-store";
import FilterSearch from "../../components/FilterSearch";
import DataTableReferrals from "../../components/DataTableReferrals";
import { DataContext } from "../../utility/context";

export default function referrals() {
  //userProfile
  const { userProfile } = useContext(DataContext);
  const textToCopy = `https://paybeforeservice.com/${userProfile?.userReferralID}`;

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<ReferralBonus[]>([]);
  const [allTxData, setAllTxData] = useState<ReferralBonus[]>([]);
  const initialLoadCount = 7; // Initial number of items to load
  const [hideWallet, setHideWallet] = useState<boolean>(false);
  const router = useRouter();

  const getReferrals = async () => {
    const storedToken = await SecureStore.getItemAsync("tokenKey");
    console.log(storedToken, "token key");

    // const endpoint = `${END_URL}/transaction/getTx?page=${currentPage}`;
    const endpoint = `${END_URL}/referral/getRefs`;
    const headers = {
      Authorization: `Bearer ${storedToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await makeCall(endpoint, {}, headers, "get");
      // console.log(response, "inside transaction");
      if (!response.status) {
        if (response.data.message === "invalid token") {
          await SecureStore.setItemAsync("tokenKey", "");
          ToastAndroid.show(`Session expired`, ToastAndroid.SHORT);
          router.push("/login");
          return;
        }
      } else {
        setFilteredData(response.data);
        setAllTxData(response.allTx);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(allTxData);
    } else {
      const filtered = allTxData.filter((item) => {
        const { type, status, amount, owner } = item;
        return (
          (type && type.toLowerCase().includes(query.toLowerCase())) ||
          owner.toLowerCase().includes(query.toLowerCase()) ||
          amount.toString().toLowerCase().includes(query.toLowerCase()) ||
          status.toLowerCase().includes(query.toLowerCase())
        );
      });

      setFilteredData(filtered);
    }
  };

  const loadMoreData = () => {
    if (filteredData.length < allTxData.length) {
      setFilteredData([
        ...filteredData,
        ...allTxData.slice(
          filteredData.length,
          filteredData.length + initialLoadCount
        ),
      ]);
    }
  };

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(textToCopy);

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

  const toggleShowAccount = () => {
    setHideWallet(!hideWallet);
  };

  useEffect(() => {
    if (loading) {
      getReferrals();
    }
  }, [loading]);

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa] ">
      {/* <ScrollView> */}
      <StatusBar animated={true} backgroundColor="#6E3EFF" />

      <View className="mx-4 py-4 ">
        <View
          className={`${
            Platform.OS === "ios" && "py-7"
          } bg-[#fff] relative overflow-hidden shadow-sm border border-[#DADADA] flex-row justify-between items-center  rounded-3xl p-6 py-10`}
        >
          <View>
            <Text className="text-sm font-semibold text-black">
              Referral Balance
            </Text>
            <Text className="text-xl font-bold text-black">
              {hideWallet
                ? "* * * *"
                : `₦${userProfile?.balances.refferal_wallet?.toFixed(2)}`}
            </Text>
          </View>

          <View className="h-28 w-32 bg-[#a23eff5f] rounded-full absolute -right-12 -bottom-20">
            <View className="h-28 w-28 bg-[#a23eff56] rounded-full absolute right-7 bottom-3"></View>
          </View>
          <View>
            <MaterialCommunityIcons
              name={hideWallet ? "eye-off" : "eye"}
              size={24}
              className="m absolute"
              color="#000"
              onPress={toggleShowAccount}
            />
          </View>
        </View>
      </View>

      <View className="mx-4 ">
        <Text className="mb-2 font-semibold text-[#555555] text-sm">
          Referral Link
        </Text>
        <View className="flex-row border border-[#DADADA] bg-white p-4 rounded-xl justify-between">
          <Text className="font-medium text-[#555555] text-base">
            {textToCopy}
          </Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Image source={icons.link} className="h-5 w-5" />
          </TouchableOpacity>
        </View>
      </View>

      <FilterSearch handleSearch={handleSearch} searchQuery={searchQuery} />

      <Text className="mx-8 mt-4 font-semibold text-[#555555] text-sm">
        Referrals
      </Text>

      <DateBox />
      <DataTableReferrals
        data={filteredData}
        loadState={loading}
        onEndReached={loadMoreData}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
