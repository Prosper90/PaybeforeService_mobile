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

export default function DataTable({
  data,
  loadState,
  isTransactionComponent,
  onEndReached,
}: any) {
  const { setSelectedViewTransaction, setCancelPayment } =
    useContext(DataContext);
  const view = (selected: any) => {
    setSelectedViewTransaction(selected);
    router.push("/view/transaction");
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
            {item.type}
          </Text>
          {item.type === "Payment" ? (
            <Text
              className={`${
                Platform.OS === "ios" && "text-xs"
              } font-semibold text-sm text-[#000]`}
            >
              ₦{item?.payment.amount_created}/₦{item?.payment.amount_paid}
            </Text>
          ) : (
            <Text
              className={`${
                Platform.OS === "ios" && "text-xs"
              } font-semibold text-sm text-[#000]`}
            >
              ₦{item?.withdrawal.amount}
            </Text>
          )}
          <Text className="font-normal text-[#555555] text-xs">
            {item.type === "Payment"
              ? formatDate(item.payment.created)
              : formatDate(item.createdAt)}
          </Text>
        </View>
      </View>
      {item.type === "Payment" && item.payment.isPaid === "pending" ? (
        // <TxCancel data={item.payment} /> //we call cancel
        <TouchableOpacity
          onPressIn={() =>
            setCancelPayment({
              modal: true,
              code: item.linkID,
            })
          }
          className="px-6 py-3 justify-center bg-[#a23eff32] rounded-full mr-1"
        >
          <Text className="text-[#A23EFF] text-xs font-bold">Cancel</Text>
        </TouchableOpacity>
      ) : item.type === "Payment" &&
        item.payment.isPaid === "complete" &&
        !item.payment.isRedeemed ? (
        // <TxReedem item={item} setRedeemObj={setRedeemObj} /> //we call reedem
        <TouchableOpacity
          onPressIn={() => router.push("/payment/redeem")}
          className="px-6 py-3 justify-center bg-[#a23eff32] rounded-full mr-1"
        >
          <Text className="text-[#A23EFF] text-xs font-bold">Redeem</Text>
        </TouchableOpacity>
      ) : (
        // <TxDownload data={item} /> //We call Download
        <TouchableOpacity
          onPressIn={() => view(item)}
          className="px-6 py-3 justify-center bg-[#a23eff32] rounded-full mr-1"
        >
          <Text className="text-[#A23EFF] text-xs font-bold">View</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="mx-4 mt-3 border border-[#DADADA] flex-1 flex-grow bg-white pb-3 px-5 mb-4 rounded-xl">
      {loadState ? (
        <Text className="font-bold text-3xl text-center pt-20 text-[#555555]">
          Loading...
        </Text>
      ) : !loadState && data.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={isTransactionComponent ? onEndReached : undefined}
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
            <Text className="font-normal text-xs text-gray-600">
              Your payments would show up here after you have made a successful
              transaction
            </Text>
          </View>
        )
      )}
    </View>
  );
}
