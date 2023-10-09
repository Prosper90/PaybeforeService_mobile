/** @format */

import {
	FlatList,
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from './icons/Icons';

export default function DataTable({ data, transType }: any) {

	
     
	const renderItem = ({ item }: any) => (
		<View className='flex-row justify-between mt-4 items-center'>
			<View className='flex-row gap-5 items-center'>
				<Image
					source={icons.tableSvg}
					className={`${Platform.OS === "ios" ? "h-12 w-12" : "h-14 w-14" }`}
				/>
				<View>
					<Text className={`${Platform.OS === "ios" ? "text-sm": "text-base"} font-medium text-[#000] `}>
						{item.text}
					</Text>
					{item.type === 'referrals' ? null : (
						<Text className={`${Platform.OS === "ios" ? "text-sm": "text-lg"} font-semibold text-[#000]`}>
							{item.amount}
						</Text>
					)}
					<Text className='font-normal text-[#555555] text-sm'>
						{item.date}
					</Text>
				</View>
			</View>
			{item.type === 'referrals' ? (
				<View>
					<Text className='font-semibold text-[#000] text-lg'>
						{item.amount}
					</Text>
					<TouchableOpacity className='px-4 py-1 mt-2 justify-center bg-[#a23eff1b] rounded-full mr-1'>
						<Text className='text-[#A23EFF] text-xs'>
							Successful
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity className='px-6 py-3 justify-center bg-[#a23eff32] rounded-full mr-1'>
					<Text className='text-[#A23EFF] text-xs font-bold'>Redeem</Text>
				</TouchableOpacity>
			)}
		</View>
	);

	return (
		<View className='mx-4 mt-3 border border-[#DADADA] flex-1 flex-grow bg-white pb-3 px-5 mb-4 rounded-xl'>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}
