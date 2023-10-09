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
import React from 'react';
import icons from '../../components/icons/Icons';
import DashboardBalance from '../../components/DashboardBalance';
import DataTable from '../../components/DataTable';
import data from '../../utility/data.json'

export default function Index() {


	return (
		<SafeAreaView className='flex-1 bg-[#fafafa] '>
			{/* <ScrollView> */}
			<StatusBar
				animated={true}
				backgroundColor='#6E3EFF'
			/>

			<View className='gap-4 py-4 '>
				<View className={`${Platform.OS === "ios" ? "" : "pt-10"} flex-row items-center justify-between px-4`}>
					<View>
						<View className='flex-row items-center'>
							<View className='border m-1 border-[#6E3EFF] rounded-full mx-2'>
								<Text className='text-[40px]'>😎</Text>
							</View>
							<Text className='text-[#6E3EFF] font-bold text-xl'>
								Lord Gaga
							</Text>
						</View>
					</View>
					<Image
						className='h-6 w-6'
						source={require('../../assets/images/music-play.png')}
					/>
				</View>

				<DashboardBalance />
			</View>
			<View className=' flex-row gap-4 relative  items-center justify-center px-2'>
				<TouchableOpacity className='items-center flex-row pb-4 w-[42vw] px-4 pt-2 gap-2 justify-center bg-[#6e3eff] rounded-2xl'>
					<Image
						source={icons.exportIcon}
						className='h-5 w-5'
					/>
					<Text className={`${Platform.OS === "ios" ? "text-[10px]": "text-sm"} text-white font-bold`}>
						Generate payment
					</Text>
				</TouchableOpacity>
				<TouchableOpacity className='items-center flex-row pb-4 w-[42vw] px-4 pr-9 pt-2 gap-2 justify-center bg-[#A23EFF] rounded-2xl'>
					<Image
						source={icons.withdraw}
						className='h-5 w-5'
					/>
					<Text className={`${Platform.OS === "ios" ? "text-[10px]": "text-sm"} text-white font-bold`}>
						Withdraw
					</Text>
				</TouchableOpacity>
			</View>

			{/* <View className="mx-4 mt-4">
          <Text className="mb-2 font-semibold text-[#555555] text-sm">
            Referral Link
          </Text>
          <View className="flex-row border border-[#DADADA] bg-white p-4 rounded-xl justify-between">
            <Text className="font-medium text-[#555555] text-base">
              {textToCopy}
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Image source={icons.link} className="h-5 w-5" />
            </TouchableOpacity>
          </View>
        </View> */}
			<Text className='mx-8 mt-4 font-semibold text-[#555555] text-sm'>
				Recent Transactions
			</Text>
			<DataTable data={data} transType="transaction" />
			{/* </ScrollView> */}
		</SafeAreaView>
	);
}
