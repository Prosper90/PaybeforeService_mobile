import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import icons from "./icons/Icons";
import { router } from "expo-router";
import { formatDate } from "../utility/constants";
import { DataContext } from "../utility/context";
import Loader from "./Loader";

export default function DataTableDispute({
  data,
  loadState,
  onEndReached,
}: any) {
  const { selectedViewDispute, setSelectedViewDispute } =
    useContext(DataContext);
  const view = (selected: any) => {
    setSelectedViewDispute(selected);
    router.push("/view/dispute");
  };

  const renderItem = ({ item }: any) => (
    <View className="flex-row justify-between mt-4 items-center">
      <View className="flex-row gap-5 items-center">
        <Image
          source={icons.tableSvg}
          className={`${Platform.OS === "ios" && "h-10 w-10"} h-12 w-12`}
        />
        <View>
          <Text
            className={`${
              Platform.OS === "ios" && "text-xs"
            } text-sm font-medium text-[#000]`}
          >
            {item?.dispute_id}
          </Text>
          <Text
            className={`${
              Platform.OS === "ios" && "text-xs"
            } font-semibold text-sm text-[#000]`}
          >
            {item?.status}
          </Text>
          {/* {item?.amount && (
            <Text
              className={`${
                Platform.OS === "ios" && "text-xs"
              } font-semibold text-sm text-[#000]`}
            >
              ₦{item?.amount}
            </Text>
          )} */}
          <Text className="font-normal text-[#555555] text-xs">
            {formatDate(item.createdAt)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPressIn={() => view(item)}
        className="px-6 py-3 justify-center bg-[#a23eff32] rounded-full mr-1"
      >
        <Text className="text-[#A23EFF] text-xs font-bold">View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="mx-4 mt-3 border border-[#DADADA] flex-1 flex-grow bg-white pb-3 px-5 mb-4 rounded-xl">
      {loadState ? (
        <Text className="font-bold text-3xl text-center pt-24 text-[#555555]">
          <Loader />
        </Text>
      ) : !loadState && data?.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          // keyExtractor={(item) => item._id}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      ) : (
        !loadState &&
        data.length === 0 && (
          <View className="flex justify-center flex-col mt-20 items-center ">
            {/* <img src="./empty.svg" className="w-28 h-28" alt="" /> */}
            <Image
              source={icons.empty}
              className={`${Platform.OS === "ios" && "h-10 w-10"} h-12 w-12`}
            />
            <Text className="font-semibold text-xs text-black">
              You have no transactions
            </Text>
            <Text className="font-normal text-xs text-gray-600 text-center">
              Your payments would show up here after you have made a successful
              transaction
            </Text>
          </View>
        )
      )}
    </View>
  );
}
