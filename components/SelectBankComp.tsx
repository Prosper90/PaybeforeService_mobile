import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Notifier, Easing } from "react-native-notifier";
import { DataContext } from "../utility/context";
import icons from "./icons/Icons";
import { Bank } from "../utility/types";
import { supportedBanks } from "../app/withdrawal/constants";
import { images } from "../images";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SelectBankComp({ selBank, setSelBank }: any) {
  const router = useRouter();
  // const [bene, setBene] = useState([{}]);
  const [filteredData, setFilteredData] = useState<Bank[]>([]);
  const [allTxData, setAllTxData] = useState<Bank[]>([]);

  //   const [pickedBene, setPickedBene] = useState<string>("");
  const { userProfile, setWithdraw } = useContext(DataContext);
  const initialLoadCount = 7;

  const Search = (e: any) => {
    const searchTerm = e;

    const searchedData = allTxData.filter((bank) => {
      return bank.name.toLowerCase().includes(searchTerm.toLowerCase());
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

  const pickBank = (data: any) => {
    // setPickedBank(data.id);
    setWithdraw((prevWithdraw: any) => ({
      ...prevWithdraw,
      bankName: data?.name,
      bankShortCode: data?.short_code,
      bankImg: data?.img_url,
      bankCode: data?.code,
    }));
    setSelBank(false);
  };

  useEffect(() => {
    setFilteredData(images.slice(0, 8));
    setAllTxData(images);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      key={item.id} // Use the unique 'id' property as the key
      onPress={() => pickBank(item)}
      className="cursor-pointer border-ui-border hover:bg-[#FFF] border-border rounded-[10px] p-2"
    >
      <View className="flex flex-row items-center gap-3 w-[100%]">
        {/* <Image
          // source={item.img_url}
          source={require(`${item?.img_url}`)}
          width={10}
          height={10}
          className="h-10 rounded-[100%]"
        /> */}
        <Image
          source={item.img_url}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View className="flex flex-col">
          <Text className="font-bold text-[#0D0033] text-xs">{item.name}</Text>
          <Text className="text-[#555] text-xs">Aa Finance</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // return (
  //   <Modal
  //     animationType="slide"
  //     transparent={true}
  //     visible={selBank}
  //     onRequestClose={() => {
  //       setSelBank(false);
  //     }}
  //   >
  //     <View className="flex-1 px- bg-[#00000056] relative justify-center">
  //       <View className="flex flex-col items-center">
  //         {/* <Text className="font-ui-semi font-semibold text-lg mt-0 text-[#0D0033] mb-2 text-center">
  //         Saved Accounts
  //       </Text> */}
  //         <View className="w-full bg-[#FFF] border items-center rounded-md p-2 px-3 flex">
  //           <TextInput
  //             placeholder="Search"
  //             onChangeText={(text) => Search(text)}
  //             className="bg-transparent outline-none text-sm px-2 w-full text-[#323232]"
  //           />
  //           <Image source={icons.search} className="h-5 w-5" />
  //         </View>

  //         <FlatList
  //           data={filteredData}
  //           renderItem={renderItem}
  //           keyExtractor={(item) => item.id.toString()} // Use the 'id' property as the key
  //           onEndReached={loadMoreData}
  //           onEndReachedThreshold={0.5}
  //         />
  //       </View>
  //     </View>
  //   </Modal>
  // );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selBank}
      onRequestClose={() => {
        setSelBank(!selBank);
      }}
    >
      <View className="flex-1 px- bg-[#00000056] relative justify-center mb-12 h-[80%]">
        <View className="h-auto items-center p-5 pb-6 mx-4 rounded-2xl bg-white ">
          <View className="w-full bg-[#FFF] border rounded-md p-2 px-3 flex flex-row items-center justify-center">
            <TextInput
              placeholder="Search"
              onChangeText={(text) => Search(text)}
              className="bg-transparent outline-none text-sm px-2 w-full text-[#323232]"
            />
            <Image source={icons.search} className="h-5 w-5" />
          </View>

          <View className="flex w-full h-48">
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id} // Use the 'id' property as the key
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
