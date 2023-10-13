/** @format */

import {
	Image,
	SafeAreaView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import icons from '../../components/icons/Icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
import data from '../../utility/data.json';
import DataTable from '../../components/DataTable';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function transaction() {
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
    setShowDatePicker(!showDatePicker);
	};

	return (
		<SafeAreaView className='bg-[##FAFAFA] flex-1'>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View className='flex-row border border-[#DADADA] items-center pb-4 gap-4 mt-5 mx-4 bg-white rounded-xl '>
				<TouchableOpacity>
					<Image
						source={icons.search}
						className='h-5 w-5'
					/>
				</TouchableOpacity>
				<TextInput
					style={{ height: 40 }}
					placeholder='Search transaction '
					className='w-full  text-base '
					keyboardType='web-search'
					// onChangeText={newText => setText(newText)}
					// defaultValue={text}
				/>
			</View>

			<View className='flex-row mt-4 mx-6 items-center justify-between'>
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
				<TouchableOpacity
					onPress={click}
					className='flex-row border w-[35%] border-[#DADADA] bg-white p-4 rounded-xl justify-between'>
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
		{showDatePicker ? (
				<RNDateTimePicker
					value={selectedDate}
					display='calendar'
					onChange={handleDateChange}
				/>
			) : null}
			<DataTable data={data}  />
		</SafeAreaView>
	);
}
