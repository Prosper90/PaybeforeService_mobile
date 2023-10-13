/** @format */

import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
// import { useColorScheme } from 'react-native';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	// const colorScheme = useColorScheme();

	return (
		// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
		<Stack>
			<Stack.Screen
				name='index'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='login'
				options={{ headerShown: !true }}
			/>
			<Stack.Screen
				name='signup'
				options={{
					headerShown: false,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
			<Stack.Screen
				name='payment'
				options={{
					headerShown: false,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
			<Stack.Screen
				name='userprofile'
				options={{
					headerShown: false,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>

			<Stack.Screen
				name='(dashboard)'
				options={{
					headerShown: false,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#fafafa',
					},
					headerTintColor: '#000',
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
		
			{/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
		</Stack>
		// {/* </ThemeProvider> */}
	);
}
