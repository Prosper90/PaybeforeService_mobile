/** @format */

import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  // Clipboard,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import icons from "../../components/icons/Icons";
import DashboardBalance from "../../components/DashboardBalance";
import DataTable from "../../components/DataTable";
import GpaymentModal from "../../components/GpaymentModal";
import GLinkModal from "../../components/GLinkModal";
import WithdrawModal from "../../components/WithdrawModal";
import { DataContext } from "../../utility/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { transactiondata } from "../../utility/data";
import usePagination from "../hooks/usePagination";
import { PaymentReturnValue, SelectedData } from "../../utility/types";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import io, { Socket, Manager } from "socket.io-client";
import { SuccessPayment } from "../../components/SvgItems";
import SuccessPaymentModal from "../../components/SuccessPaymentModal";
import { Notifier, Easing } from "react-native-notifier";
import WarnUser from "../../components/WarnUser";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [txloading, setTxLoading] = useState(true);
  //payment generation details
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [paymentId, setPaymentId] = useState<PaymentReturnValue>({
    linkID: "",
    issue_id: "",
    account_number: "",
    bank_name: "",
    account_name: "",
    expired: "",
    amount_created: "",
    isPaid: "",
    status: "",
    user: "",
  });
  const [account_info, setAccountInfo] = useState({});
  // const [timeOut, setTimeOut] = useState(false);
  const [duration, setDuration] = useState<any>();
  const [recentTransactions, setRecentTransactions] = useState<SelectedData[]>(
    []
  );
  //for the socket io and recieving payment
  const [socket, setSocket] = useState<Socket | null>(null);

  const { userProfile, successPayment, setSuccessPayment, setPaymentPaidFor } =
    useContext(DataContext);
  const router = useRouter();

  const getRecentTransaction = async () => {
    const storedToken = await SecureStore.getItemAsync("tokenKey");
    console.log(storedToken, "token key");

    const endpoint = `${END_URL}/transaction/getTx?page=${1}`;
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
        setRecentTransactions(response.data);
        // setAllTxData(response.allTx);
        setTxLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    await SecureStore.setItemAsync("tokenKey", "");
    router.push("/login");
  };

  const withdraw = () => {
    router.push("/withdrawal");
  };

  useEffect(() => {
    if (txloading) {
      getRecentTransaction();
    }
  }, [txloading]);

  useEffect(() => {
    if (Object.keys(paymentId).length !== 0) {
      try {
        // Connect to the server
        const live = "https://paybeforeservice.onrender.com";
        const local = "http://localhost:8000/";
        const newSocket: Socket = io(live);
        setSocket(newSocket);

        console.log("Attempting to connect to the server... dashboard");

        newSocket.on("connect", () => {
          console.log(
            `Connection established with the server Payment${paymentId?.issue_id}`
          );
        });

        newSocket.on(`Pay${paymentId?.issue_id}`, (data: any) => {
          if (data.status === "success") {
            setSuccessPayment(true);
            setPaymentPaidFor(paymentId.linkID);
            Notifier.showNotification({
              title: "Payment incoming",
              description: `${paymentId.linkID} initiated and in progress`,
              duration: 0,
              showAnimationDuration: 800,
              showEasing: Easing.bounce,
              // onHidden: () => console.log('Hidden'),
              // onPress: () => console.log('Press'),
              hideOnPress: false,
            });
            // setConfettiActiveDashboard(true);
          }
        });

        // Disconnect after 10 minutes
        // const duration = 600; // 10 minutes in seconds
        // console.log(duration, "di di di dashboard");
        setTimeout(() => {
          newSocket.disconnect();
        }, Math.round(duration * 1000));
      } catch (error) {
        console.error("Error connecting to the server:", error);
      }
    }
  }, [successPayment, paymentId]);

  // Clean up the socket connection on component unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]">
      {/* <ScrollView> */}
      <StatusBar animated={true} backgroundColor="#6E3EFF" />

      <View className="gap-4 py-4 ">
        <View
          className={`${
            Platform.OS === "ios" ? "" : "pt-10"
          } flex-row items-center justify-between px-4`}
        >
          <View>
            <View className="flex-row items-center">
              <View className="border m-1 border-[#6E3EFF] rounded-full mx-2">
                {/* <Text className="text-[40px]">😎</Text> */}
                <MaterialCommunityIcons
                  name="account"
                  size={32}
                  className=""
                  color="#6E3EFF"
                  // onPress={goBack}
                />
              </View>
              <Text className="text-[#6E3EFF] font-bold text-xl">
                {userProfile?.username}
              </Text>
            </View>
          </View>
          <View>
            <MaterialCommunityIcons
              name="logout"
              size={32}
              className=""
              color="#6E3EFF"
              onPress={logOut}
            />
          </View>
          {/* <Image
						className='h-6 w-6'
						source={require('../../assets/images/music-play.png')}
					/> */}
        </View>

        <DashboardBalance />
      </View>
      <View className=" flex-row gap-4 relative  items-center justify-center px-2">
        <TouchableOpacity
          onPressIn={() => setModalVisible(!modalVisible)}
          className="items-center flex-row py-3 w-[42vw] px-4  justify-center bg-[#6e3eff] rounded-xl"
        >
          <Image source={icons.exportIcon} className="h-4 w-4 mr-2" />
          <Text
            className={`${
              Platform.OS === "ios" ? "text-[10px]" : "text-xs"
            } text-white font-bold`}
          >
            Generate payment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={() => withdraw()}
          className="items-center flex-row py-3 w-[42vw] px-4 pr-9 justify-center bg-[#A23EFF] rounded-xl"
        >
          <Image source={icons.withdraw} className="h-4 w-4 mr-1" />
          <Text
            className={`${
              Platform.OS === "ios" ? "text-[10px]" : "text-sm"
            } text-white font-bold`}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View className="mx-4 mt-4">
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
        </View> */}
      <Text className="mx-8 mt-4 font-semibold text-[#555555] text-sm">
        Recent Transactions
      </Text>
      <DataTable data={recentTransactions} loadState={txloading} />
      <GpaymentModal
        modalVisible={modalVisible}
        setPaymentModal={setPaymentModal}
        setModalVisible={setModalVisible}
        setPaymentLink={setPaymentLink}
        setPaymentId={setPaymentId}
        setDuration={setDuration}
      />
      <GLinkModal
        setPaymentModal={setPaymentModal}
        paymentModal={paymentModal}
        paymentId={paymentId}
        paymentLink={paymentLink}
      />
      <WithdrawModal
        setWithdrawModal={setWithdrawModal}
        withdrawModal={withdrawModal}
      />
      <WarnUser />
      {/* <SuccessPaymentModal /> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
// withdrawModal
