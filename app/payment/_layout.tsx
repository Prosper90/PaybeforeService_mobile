/** @format */

import { Stack } from 'expo-router/stack';

export default function PaymentLayout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
					options={{
					headerShown: true,
					headerTitle: 'Withdraw',
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTitleAlign:'center',
					headerTintColor: '#000',
				}}
			/>
			<Stack.Screen
				name='redeem'
					options={{
					headerShown: true,
					headerTitle: 'Redeem Payment',
					headerTitleAlign:'center',
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTintColor: '#000',
					// headerShadowVisible: false,
					
					// presentation: 'modal',
				}}
			/>
			<Stack.Screen
				name='choose'
					options={{
					headerShown: true,
					headerTitle: 'Bank Information',
					headerTitleAlign:'center',
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTintColor: '#000',
					// headerShadowVisible: false,
					// presentation: 'modal',
				}}
			/>
		</Stack>
	);
}
