/** @format */

import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

export default function gender() {
    const [gender, setGender] = useState("")
	return (
		<View className='flex-1 bg-[#FAFAFA] items-center relative px-6'>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View className='mt-2 justify-center items-center h-4/5'>
				<Text className=' text-xl font-bold text-[#6E3EFF]'>
					PayBeforeService
				</Text>
				<Text className=' text-2xl text-center  font-medium mt-3'>
					What is your Gender
				</Text>
				<View className='my-4 w-96 px-6 pr-[3px] items-center'>
					<TouchableOpacity onPress={() => setGender("woman")} className='flex-row items-start justify-start gap-3 border border-[#DADADA] bg-[#F7F5FF]  rounded-lg my-4 pt-3 pb-5 px-5 w-full'>
						<View className={`${gender === "woman" ? ' border-[#6E3EFF]' : ' border-gray-400'} border-4 rounded-full p-1 px-1 bg-white`}></View>
						<Text>Woman</Text>
					</TouchableOpacity>
                    	<TouchableOpacity onPress={() => setGender("man")} className='flex-row items-start justify-start gap-3 border border-[#DADADA] bg-[#F7F5FF]  rounded-lg my-4 pt-3 pb-5 px-5 w-full'>
						<View className={`${gender === "man" ? ' border-[#6E3EFF]' : ' border-gray-400'} border-4 rounded-full p-1 px-1 bg-white`}></View>
						<Text>Man</Text>
					</TouchableOpacity>
				</View>

				<Text className='text-center text-[#555] text-base'>
					You must be atleast 18years to use Swiftsettle
				</Text>
			</View>
            <TouchableOpacity className='border-2 items-center absolute bottom-8 justify-center bg-[#6E3EFF] rounded-full w-full border-white'>
				<Link className='py-3' href='/signup/location'>
					<Text className='text-white font-bold text-lg p-3 '>
						Continue
					</Text>
				</Link>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({});
