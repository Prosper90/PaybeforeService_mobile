import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import icons from "../../components/icons/Icons";
import DataTable from "../../components/DataTable";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import FilterSearch from "../../components/FilterSearch";
import * as SecureStore from "expo-secure-store";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import { SelectedData } from "../../utility/types";
import usePagination from "../hooks/usePagination";
import { ToastAndroid } from "react-native";
import Pagination from "../../components/Pagination";
import { useRouter } from "expo-router";

export default function transaction() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<SelectedData[]>([]);
  const [allTxData, setAllTxData] = useState<SelectedData[]>([]);
  const initialLoadCount = 7; // Initial number of items to load
  const router = useRouter();

  const getTransaction = async () => {
    const storedToken = await SecureStore.getItemAsync("tokenKey");
    console.log(storedToken, "token key");

    // const endpoint = `${END_URL}/transaction/getTx?page=${currentPage}`;
    const endpoint = `${END_URL}/transaction/getTx`;
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
        const { type, payment, withdrawal, owner, track_id, status } = item;
        return (
          (type && type.toLowerCase().includes(query.toLowerCase())) ||
          (payment &&
            (payment.linkID?.toLowerCase().includes(query.toLowerCase()) ||
              payment.created
                ?.toString()
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              payment.expired
                ?.toString()
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              payment.amount_created.toString().includes(query.toLowerCase()) ||
              payment.amount_paid.toString().includes(query.toLowerCase()) ||
              payment.isPaid.toLowerCase().includes(query.toLowerCase()) ||
              payment.isRedeemed
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              payment.reciever.toLowerCase().includes(query.toLowerCase()) ||
              (payment.sender &&
                (payment.sender.account_name
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                  payment.sender.account_number
                    .toLowerCase()
                    .includes(query.toLowerCase()))))) ||
          (withdrawal &&
            (withdrawal.amount.toString().includes(query.toLowerCase()) ||
              withdrawal.sender.toLowerCase().includes(query.toLowerCase()) ||
              (withdrawal.reciever &&
                (withdrawal.reciever.account_name
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                  withdrawal.reciever.account_number
                    .toLowerCase()
                    .includes(query.toLowerCase()))) ||
              withdrawal.description
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              withdrawal.status
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase()))) ||
          owner.toLowerCase().includes(query.toLowerCase()) ||
          track_id.toLowerCase().includes(query.toLowerCase()) ||
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

  useEffect(() => {
    if (loading) {
      getTransaction();
    }
  }, [loading]);

  return (
    <SafeAreaView className="bg-[#FAFAFA] flex-1">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <FilterSearch handleSearch={handleSearch} searchQuery={searchQuery} />
      {/* <DataTable data={filteredData} loadState={loading} /> */}
      <DataTable
        data={filteredData}
        loadState={loading}
        isTransactionComponent={true}
        onEndReached={loadMoreData}
      />
      {/* <Pagination /> */}
    </SafeAreaView>
  );
}
