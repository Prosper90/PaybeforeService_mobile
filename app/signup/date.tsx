/** @format */

import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import DropdownSelect from 'react-native-input-select';

export default function date() {
	const [selectedDay, setSelectedDay] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');

	// Define data for days, months, and years
	const days = Array.from({ length: 31 }, (_, i) =>
		(i + 1).toString(),
	);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const years = Array.from({ length: 120 }, (_, i) =>
		(new Date().getFullYear() - i).toString(),
	);

	return (
		<View className='flex-1 bg-[#FAFAFA] items-center relative px-6'>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View className='mt-2 justify-center items-center h-4/5'>
				
				<Text className=' text-2xl text-center  font-medium mt-3'>
					Hey Dollilop, Tell us when you were born
				</Text>
				<View className='flex-row gap-3 mt-3 w-full'>
					{/* Day Dropdown */}
					<View className='w-24'>
						<DropdownSelect
							label=''
							placeholder='Day'
							options={days.map((day) => ({
								label: day,
								value: day,
							}))}
							selectedValue={selectedDay}
							onValueChange={(value: any) =>
								setSelectedDay(value)
							}
							primaryColor={'#6E3EFF'}
							dropdownStyle={{
								borderWidth: 1,
                                borderColor:"#DADADA",
                                borderRadius:15,
                                backgroundColor:'#F7F5FF',
                                padding:5,
							}}
						/>
					</View>

					{/* Month Dropdown */}
					<View className='w-28'>
						<DropdownSelect
							label=''
							placeholder='Month'
							options={months.map((month) => ({
								label: month,
								value: month,
							}))}
							selectedValue={selectedMonth}
							onValueChange={(value: any) =>
								setSelectedMonth(value)
							}
							primaryColor={'#6E3EFF'}
							dropdownStyle={{
								borderWidth: 1,
                                borderColor:"#DADADA",
                                borderRadius:15,
                                backgroundColor:'#F7F5FF',
                                padding:5,
							}}
						/>
					</View>

					{/* Year Dropdown */}
					<View className='w-28'>
						<DropdownSelect
							label=''
							placeholder='Year'
							options={years.map((year) => ({
								label: year,
								value: year,
							}))}
							selectedValue={selectedYear}
							onValueChange={(value: any) =>
								setSelectedYear(value)
							}
							primaryColor={'#6E3EFF'}
							dropdownStyle={{
								borderWidth: 1,
                                borderColor:"#DADADA",
                                borderRadius:15,
                                backgroundColor:'#F7F5FF',
                                padding:5,
							}}
						/>
					</View>
				</View>

				<Text className='text-center text-[#555] text-base'>
					You must be atleast 18 years to use Swiftsettle
				</Text>
			</View>
			<TouchableOpacity className='border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
				<Link className='py-3' href='/signup/gender'>
					<Text className='text-white font-bold text-lg p-3 '>
						Continue
					</Text>
				</Link>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		color: 'red',
	},
});
