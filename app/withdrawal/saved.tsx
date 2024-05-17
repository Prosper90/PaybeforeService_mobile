import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import icons from "../../components/icons/Icons";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { DataContext } from "../../utility/context";
import * as SecureStore from "expo-secure-store";
import { Notifier, Easing } from "react-native-notifier";
import { makeCall } from "../../utility/makeCall";
import { END_URL } from "../../utility/constants";
import { images } from "../../images";
import { StatusBar } from "react-native";

type Bene = {
  bank_Name: string;
  account_Number: string;
  account_Name: string;
  bank_Code: string;
  _id?: string;
  img_url_web?: string;
};

export default function saved() {
  const router = useRouter();
  // const [bene, setBene] = useState([{}]);
  const [filteredData, setFilteredData] = useState<Bene[]>([]);
  const [allTxData, setAllTxData] = useState<Bene[]>([]);

  const [pickedBene, setPickedBene] = useState<string>("");
  const { userProfile, withdraw, setWithdraw } = useContext(DataContext);
  const initialLoadCount = 7;
  const [loading, setLoading] = useState<boolean>(false);

  const deleteBene = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("tokenKey");
      setLoading(true);
      const endpoint = `${END_URL}/bene/delbeneficiary/${pickedBene}`;
      console.log(endpoint, "checking endpoint");

      const headers = {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, {}, headers, "delete");

      //   console.log(response, "omo oooh");
      if (response.status) {
        setLoading(false);
        // ToastAndroid.show(`${response?.message}`, ToastAndroid.SHORT);
        Notifier.showNotification({
          title: "Deleted Beneficiary",
          description: `${response?.message}`,
          duration: 0,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          // onHidden: () => console.log('Hidden'),
          // onPress: () => console.log('Press'),
          hideOnPress: false,
        });
      } else {
        setLoading(false);
        //this is a warning
        // ToastAndroid.show(`${response.message}`, ToastAndroid.SHORT);
        Notifier.showNotification({
          title: "Deleted Beneficiary",
          description: `${response?.message}`,
          duration: 0,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          // onHidden: () => console.log('Hidden'),
          // onPress: () => console.log('Press'),
          hideOnPress: false,
        });
      }
    } catch (error) {
      // Error in making the request or server returned an error status
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const Search = (e: any) => {
    const searchTerm = e.target.value;

    const searchedData = allTxData.filter((bank) => {
      return (
        bank.bank_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.account_Number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.account_Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(searchedData);
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

  const findImageByBankName = (bankName: any) => {
    return images.find((image) => image.name === bankName);
  };

  const pickBene = (data: any) => {
    setPickedBene(data?._id);
    setWithdraw((prevWithdraw: any) => ({
      ...prevWithdraw,
      accNo: data.account_Number,
      accName: data.account_Name,
      bankName: data.bank_Name,
      bankCode: data.bank_Code,
    }));
  };

  useEffect(() => {
    console.log(userProfile?.beneficiaries, "beneficiaries");

    if (userProfile?.beneficiaries && userProfile.beneficiaries.length !== 0) {
      console.log("one runs oo", userProfile.beneficiaries.slice(0, 8));

      setFilteredData(userProfile.beneficiaries.slice(0, 8));
      setAllTxData(userProfile.beneficiaries);
    } else {
      console.log("two runs oo");

      setFilteredData([]);
      setAllTxData([]);
    }

    console.log(filteredData, "checking filtered data");
  }, [userProfile?.beneficiaries]);

  const renderItem = ({ item }: { item: Bene }) => (
    <View
      className={`cursor-pointer border hover:bg-[#FFF] ${
        pickedBene && pickedBene === item._id
          ? "border-[#6E3EFF]"
          : "border-[#DADADA]"
      } rounded-[10px] p-2 w-[100%]`}
    >
      <TouchableOpacity
        onPress={() => pickBene(item)}
        className="cursor-pointer border-ui-border hover:bg-[#FFF] border-[#DADADA] rounded-[10px] p-2"
      >
        <View>
          {/* Render the image using the helper function */}
          {findImageByBankName(item.bank_Name) && (
            <Image
              source={findImageByBankName(item.bank_Name)?.img_url}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          )}
        </View>
        <View className="flex flex-row justify-between w-[100%] mt-2">
          <View className="text-[#555] text-xs">
            <Text>Bank Name</Text>
            <Text>Account Name</Text>
            <Text>Account Number</Text>
          </View>
          <View className="font-bold text-[#0D0033] text-xs">
            <Text>{item.bank_Name}</Text>
            <Text>{item.account_Name}</Text>
            <Text>{item.account_Number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className=" items-center h-screen  rounded-t-2xl bg-white px-5">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />

      <View className="flex flex-col h-[90%] justify-between w-[100%] mt-5">
        <View className="w-[100%]">
          <Text className="font-semibold text-lg mt-0 text-[#0D0033] mb-2 text-center">
            Saved Accounts
          </Text>
          <View className="w-full bg-[#FFF] border items-center md:w-[85%] rounded-md p-2 px-4 pr-7 flex flex-row">
            <TextInput
              placeholder="Search"
              onChangeText={(text) => Search(text)}
              className="bg-transparent outline-none text-sm px-2 w-full text-[#323232]"
            />
            <Image source={icons.search} className="h-5 w-5" />
          </View>
          {filteredData.length == 0 && Object.keys(pickedBene).length == 0 ? (
            <Text className="text-[#555] text-center w-full text-sm font-semibold">
              No Saved Beneficiary
            </Text>
          ) : (
            <View className="w-[100%] mt-5">
              <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(bene: any) => bene?._id}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
              />
            </View>
          )}
        </View>

        {pickedBene.length !== 0 && (
          <View className="flex flex-row justify-center items-center gap-2 w-[100%] mt-3">
            <TouchableOpacity
              onPress={() => deleteBene()}
              className="border-2 items-center justify-center  rounded-full border-[#6E3EFF] mt-10 w-[50%]"
            >
              <Text className="font-bold text-lg text-[#6E3EFF] p-3 ">
                {loading ? "Loading..." : "Delete"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(`withdrawal/bankDetails`)}
              className="border-2 items-center justify-center bg-[#6E3EFF] rounded-full border-white mt-10 w-[50%]"
            >
              <Text className="text-white font-bold text-lg p-3 ">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* <TouchableOpacity
          onPress={() => router.push(`withdrawal/${selected}`)}
          className="border-2 mt-3 items-center justify-center bg-[#6E3EFF] rounded-full w-full border-white"
        >
          <Text className="text-white font-bold text-lg p-3 ">Continue</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
