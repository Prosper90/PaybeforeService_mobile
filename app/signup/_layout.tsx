/** @format */

import { Stack } from 'expo-router/stack';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name='otp'
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name='email'
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name='date'
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name='gender'
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name='location'
				options={{
					headerShown: true,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
}
