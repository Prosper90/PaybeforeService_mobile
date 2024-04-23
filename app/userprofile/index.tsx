/** @format */

import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import icons from '../../components/icons/Icons';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function index() {
	return (
		<SafeAreaView className='flex-1 bg-[#FAFAFA] px-4 justify-between py-16 gap-4'>
			<View className='px-6 items-center justify-center '>
				<View className='border mb-5 mt-16 rounded-lg border-[#DADADA] bg-white p-4'>
					<Text className='text-sm font-medium text-[#808080] px-5'>
						Full Name
					</Text>
					<View className='flex-row items-center relative  rounded-md  px-6 '>
						<TextInput
							// style={{ height }}
							placeholder=''
							className='w-full  text-[#6E3EFF] text-lg font-semibold '
							// keyboardType=''
							// onChangeText={newText => setText(newText)}
							defaultValue='Lord Gaga'
						/>
						<MaterialCommunityIcons
							name='lock'
							size={24}
							className='m absolute  '
							// color="#808080"
						/>
					</View>
				</View>
				<View className='border mb-5 rounded-lg border-[#DADADA] bg-white p-4'>
					<Text className='text-sm font-medium text-[#808080] px-5'>
						Email Address
					</Text>
					<View className='flex-row items-center relative  rounded-md  px-6 '>
						<TextInput
							// style={{ height }}
							placeholder=''
							className='w-full  text-[#6E3EFF] text-lg font-semibold '
							// keyboardType=''
							// onChangeText={newText => setText(newText)}
							defaultValue='faithgodwin821@@gmail.com'
						/>
						<MaterialCommunityIcons
							name='lock'
							size={24}
							className='m absolute  '
							// color="#808080"
						/>
					</View>
				</View>
				<View className='border mb-5 rounded-lg border-[#DADADA] bg-white p-4'>
					<Text className='text-sm font-medium text-[#808080] px-5'>
						Date of Birth
					</Text>
					<View className='flex-row items-center relative  rounded-md  px-6 '>
						<TextInput
							// style={{ height }}
							placeholder=''
							className='w-full  text-[#6E3EFF] text-lg font-semibold '
							// keyboardType=''
							// onChangeText={newText => setText(newText)}
							defaultValue='01-25-1998'
						/>
						<MaterialCommunityIcons
							name='lock'
							size={24}
							className='m absolute  '
							// color="#808080"
						/>
					</View>
				</View>
				<View className='border mb-5 rounded-lg border-[#DADADA] bg-white p-4'>
					<Text className='text-sm font-medium text-[#808080] px-5'>
						Location
					</Text>
					<View className='flex-row items-center relative  rounded-md  px-6 '>
						<TextInput
							// style={{ height }}
							placeholder=''
							className='w-full  text-[#6E3EFF] text-lg font-semibold '
							// keyboardType=''
							// onChangeText={newText => setText(newText)}
							defaultValue='Lagos, Nigeria'
						/>
						<MaterialCommunityIcons
							name='refresh'
							size={24}
							className='m absolute  '
							// color="#808080"
						/>
					</View>
				</View>
			</View>
			<TouchableOpacity className='border-2   bg-[#6E3EFF] rounded-full mt-2  border-white'>
				<Text className='text-white font-bold text-center text-lg p-3 '>
					Update
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
