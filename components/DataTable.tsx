/** @format */

import {
	FlatList,
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React  from 'react';
import icons from './icons/Icons';
import { router } from 'expo-router';

export default function DataTable({ data }: any) {

	
     
	const renderItem = ({ item }: any) => (
		<View className='flex-row justify-between mt-4 items-center'>
			<View className='flex-row gap-5 items-center'>
				<Image
					source={icons.tableSvg}
					className={`${Platform.OS === "ios" && "h-10 w-10" } h-12 w-12`}
				/>
				<View>
					<Text className={`${Platform.OS === "ios" && "text-xs"} text-sm font-medium text-[#000] `}>
						{item.text}
					</Text>
					{item.type === 'referrals' ? null : (
						<Text className={`${Platform.OS === "ios" && "text-xs"} font-semibold text-sm text-[#000]`}>
							{item.amount}
						</Text>
					)}
					<Text className='font-normal text-[#555555] text-xs'>
						{item.date}
					</Text>
				</View>
			</View>
			{item.type === 'referrals' ? (
				<View>
					<Text className='font-semibold text-[#000] text-sm'>
						{item.amount}
					</Text>
					<TouchableOpacity className='px-4 py-1 mt-2 justify-center bg-[#a23eff1b] rounded-full mr-1'>
						<Text className='text-[#A23EFF] text-xs'>
							Successful
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity onPressIn={() => router.push('/payment/redeem')} className='px-6 py-3 justify-center bg-[#a23eff32] rounded-full mr-1'>
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
