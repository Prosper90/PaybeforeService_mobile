/** @format */

import {
	Image,
	Platform,
	SafeAreaView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import icons from '../../components/icons/Icons';
import { Link, router } from 'expo-router';

export default function profile() {
  

	return (
		<SafeAreaView className='flex-1 bg-[#fafafa] px-6'>
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>
			<View
				className={`${
					Platform.OS === 'ios' ? '' : ''
				}  items-center justify-center px-4`}>
				<View>
					<View className='items-center mt-5 '>
						<View className='border m-1 border-[#6E3EFF] rounded-full mx-2'>
							<Text className='text-[60px]'>😎</Text>
						</View>
						<Text className='text-[#6E3EFF] font-bold text-xl'>
							Lord Gaga
						</Text>
					</View>
				</View>
			</View>
			<View className='gap-4 mt-5 px-6'>
				<TouchableOpacity onPress={() => router.push("/userprofile")} className='flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5'>
					<View className='flex-row gap-4 items-center justify-between'>
						<Image
							source={icons.profileMenu}
							className='h-10 w-10'
						/>
						<Text
							className={`${
								Platform.OS === 'ios' && 'text-base'
							} text-lg font-medium`}>
							Personal Information
						</Text>
					</View>
					<Image
						source={icons.arrowRight}
						className='h-5 w-5'
					/>
				</TouchableOpacity>
				<TouchableOpacity className='flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5'>
					<View className='flex-row gap-4 items-center justify-between'>
						<Image
							source={icons.bank}
							className='h-10 w-10'
						/>
						<Text
							className={`${
								Platform.OS === 'ios' && 'text-base'
							} text-lg font-medium`}>
							Bank Information
						</Text>
					</View>
					<Image
						source={icons.arrowRight}
						className='h-5 w-5'
					/>
				</TouchableOpacity>
				<TouchableOpacity className='flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5'>
					<View className='flex-row gap-4 items-center justify-between'>
						<Image
							source={icons.secure}
							className='h-10 w-10'
						/>
						<Text
							className={`${
								Platform.OS === 'ios' && 'text-base'
							} text-lg font-medium`}>
							Account Security
						</Text>
					</View>
					<Image
						source={icons.arrowRight}
						className='h-5 w-5'
					/>
				</TouchableOpacity>
				<TouchableOpacity className='flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5'>
					<View className='flex-row gap-4 items-center justify-between'>
						<Image
							source={icons.contact}
							className='h-10 w-10'
						/>
						<Text
							className={`${
								Platform.OS === 'ios' && 'text-base'
							} text-lg font-medium`}>
							Contact us
						</Text>
					</View>
					<Image
						source={icons.arrowRight}
						className='h-5 w-5'
					/>
				</TouchableOpacity>
				<TouchableOpacity className='flex-row justify-between items-center bg-white border rounded-xl border-[#DADADA] p-5'>
					<View className='flex-row gap-4 items-center justify-between'>
						<Image
							source={icons.notify}
							className='h-10 w-10'
						/>
						<Text
							className={`${
								Platform.OS === 'ios' && 'text-base'
							} text-lg font-medium`}>
							Notifications
						</Text>
					</View>
					<Image
						source={icons.arrowRight}
						className='h-5 w-5'
					/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
