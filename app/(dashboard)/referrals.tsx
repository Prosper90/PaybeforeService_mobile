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
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import icons from '../../components/icons/Icons';
import DataTable from '../../components/DataTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateBox from '../../components/DateBox';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import referData from '../../utility/referData.json';

export default function referrals() {
	const textToCopy = 'https://www.example.com/randht';
	const [selectedDate, setSelectedDate] = useState(
		new Date(),
	);
	const [showDatePicker, setShowDatePicker] =
		useState(false);

	const handleDateChange = ({
		event,
		selectedDate,
	}: any) => {
		if (event.type === 'set') {
			// The user has selected a date
			setSelectedDate(selectedDate);
		}
		setShowDatePicker(false);
    
	};

  const click = () => {
		setShowDatePicker(!false);
    console.log(selectedDate);
    
     console.log(showDatePicker);
     
  }

	const copyToClipboard = async () => {
		try {
			await Clipboard.setStringAsync(textToCopy);

			// Show a toast message indicating that the text has been copied
			ToastAndroid.showWithGravity(
				'Text copied to clipboard',
				ToastAndroid.SHORT,
				ToastAndroid.CENTER,
			);
		} catch (error) {
			// Handle the error, e.g., show an error message
			console.error('Clipboard copy error:', error);
		}
	};

	return (
		<SafeAreaView className='flex-1 bg-[#fafafa] '>
			{/* <ScrollView> */}
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>

			<View className='mx-4 py-4 '>
				<View className={`${Platform.OS === "ios" && "py-7"} bg-[#fff] relative overflow-hidden shadow-sm border border-[#DADADA] flex-row justify-between items-center  rounded-3xl p-6 py-10`}>
					<View>
						<Text className='text-sm font-semibold text-black'>
							Referral Balance
						</Text>
						<Text className='text-xl font-bold text-black'>
							₦50,000.00
						</Text>
					</View>

					<View className='h-28 w-32 bg-[#a23eff5f] rounded-full absolute -right-12 -bottom-20'>
						<View className='h-28 w-28 bg-[#a23eff56] rounded-full absolute right-7 bottom-3'></View>
					</View>
					<View>
						<MaterialCommunityIcons
							name={'eye-off'}
							size={24}
							className='m absolute  '
							color='#000'
						/>
					</View>
				</View>
			</View>

			<View className='mx-4 '>
				<Text className='mb-2 font-semibold text-[#555555] text-sm'>
					Referral Link
				</Text>
				<View className='flex-row border border-[#DADADA] bg-white p-4 rounded-xl justify-between'>
					<Text className='font-medium text-[#555555] text-base'>
						{textToCopy}
					</Text>
					<TouchableOpacity onPress={copyToClipboard}>
						<Image
							source={icons.link}
							className='h-5 w-5'
						/>
					</TouchableOpacity>
				</View>
			</View>
			{showDatePicker ? (
				<RNDateTimePicker
					value={selectedDate}
					display="calendar" 
					onChange={handleDateChange}
				/>
			) : null}
			<View className='flex-row mt-4 mx-6  justify-between'>
				<TouchableOpacity
					onPress={click}
					className='flex-row w-[35%] border border-[#DADADA] bg-white p-4 rounded-xl justify-between'>
					<Text className='font-medium text-[#555555] text-base'>
						Start date
					</Text>
					<Image
						source={icons.dateIcon}
						className='h-5 w-5'
					/>

				</TouchableOpacity>
				<TouchableOpacity onPress={() => setShowDatePicker(true)} className='flex-row border w-[35%] border-[#DADADA] bg-white p-4 rounded-xl justify-between'>
					<Text className='font-medium text-[#555555] text-base'>
						End date
					</Text>
					<Image
						source={icons.dateIcon}
						className='h-5 w-5'
					/>
				</TouchableOpacity>
				<TouchableOpacity className=' flex-row border items-center gap-1 border-[#DADADA] bg-[#6E3EFF] p-3 rounded-xl justify-between'>
					<Image
						source={icons.filter}
						className='h-3 w-3'
					/>
					<Text className='font-medium text-[#fff] text-base'>
						Filter
					</Text>
				</TouchableOpacity>
			</View>
			<Text className='mx-8 mt-4 font-semibold text-[#555555] text-sm'>
				Referrals
			</Text>

			<DateBox />
			<DataTable data={referData} transType="referrals" />
			{/* </ScrollView> */}
		</SafeAreaView>
	);
}
