/** @format */

import {
	Image,
	Modal,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import icons from '../../components/icons/Icons';

export default function SelectPaymentModal({

}: any) {
	return (
	
				<View className=' items-center h-screen  rounded-t-2xl bg-white '>
					
					<TouchableOpacity
						onPress={() => router.push('/payment')}
						className='border border-[#DADADA]  flex-row  items-center mt-6 p-5 w-4/5 rounded-full'>
						<Image
							source={icons.addbank}
							className={`${
								Platform.OS === 'ios' && 'h-12 w-12'
							} h-14 w-14`}
						/>
						<View className='ml-3'>
							<Text className='text-black font-semibold text-lg '>
								New Bank Account
							</Text>
							<Text className='text-[#555555] font-normal text-base  '>
								Send to a new account
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => router.push('/payment')}
						className='border border-[#DADADA]  flex-row  items-center mt-6 p-5 w-4/5 rounded-full'>
						<Image
							source={icons.addbank}
							className={`${
								Platform.OS === 'ios' && 'h-12 w-12'
							} h-14 w-14`}
						/>
						<View className='ml-3'>
							<Text className='text-black font-semibold text-lg '>
								Beneficiaries
							</Text>
							<Text className='text-[#555555] font-normal text-base  '>
								Send to a saved account
							</Text>
						</View>
					</TouchableOpacity>
				</View>
	);
}
