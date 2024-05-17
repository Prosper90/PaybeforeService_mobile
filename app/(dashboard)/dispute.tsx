import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ToastAndroid } from "react-native";
import { Dispute, SelectedData } from "../../utility/types";
import * as SecureStore from "expo-secure-store";
import { END_URL } from "../../utility/constants";
import { makeCall } from "../../utility/makeCall";
import DataTableDispute from "../../components/DataTableDispute";
import FilterSearch from "../../components/FilterSearch";
import { StatusBar } from "expo-status-bar";

export default function dispute() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Dispute[]>([]);
  const [allTxData, setAllTxData] = useState<Dispute[]>([]);
  const initialLoadCount = 7; // Initial number of items to load
  const router = useRouter();

  const getDispute = async () => {
    const storedToken = await SecureStore.getItemAsync("tokenKey");
    console.log(storedToken, "token key");

    // const endpoint = `${END_URL}/transaction/getTx?page=${currentPage}`;
    const endpoint = `${END_URL}/dispute/get_all_disputes`;
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
        setAllTxData(response.allDx);
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
        const {
          type,
          amount,
          payment_status,
          owner,
          dispute_id,
          status,
          sender,
          reciever,
          reason,
        } = item;
        return (
          type.toLowerCase().includes(query.toLowerCase()) ||
          owner.toLowerCase().includes(query.toLowerCase()) ||
          dispute_id.toLowerCase().includes(query.toLowerCase()) ||
          status.toLowerCase().includes(query.toLowerCase()) ||
          amount.toString().toLocaleLowerCase().includes(query.toLowerCase()) ||
          payment_status.toLowerCase().includes(query.toLowerCase()) ||
          sender.toLowerCase().includes(query.toLowerCase()) ||
          reciever.toLowerCase().includes(query.toLowerCase()) ||
          reason.toLowerCase().includes(query.toLowerCase())
        );
      });

      setFilteredData(filtered);
    }
  };

  const loadMoreData = () => {
    if (filteredData?.length < allTxData?.length) {
      setFilteredData([
        ...filteredData,
        ...allTxData.slice(
          filteredData?.length,
          filteredData?.length + initialLoadCount
        ),
      ]);
    }
  };

  useEffect(() => {
    if (loading) {
      getDispute();
    }
  }, [loading]);

  return (
    <SafeAreaView className="bg-[#FAFAFA] flex-1">
      <StatusBar animated={true} backgroundColor="#6E3EFF" />
      <FilterSearch handleSearch={handleSearch} searchQuery={searchQuery} />
      {/* <DataTable data={filteredData} loadState={loading} /> */}
      <DataTableDispute
        data={filteredData}
        loadState={loading}
        onEndReached={loadMoreData}
      />
      {/* <Pagination /> */}
    </SafeAreaView>
  );
}
