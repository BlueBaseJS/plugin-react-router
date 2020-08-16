/* eslint-disable react/jsx-no-bind */
import { Divider, List } from '@bluebase/components';
import { ScrollView, View } from 'react-native';

import React from 'react';
import { useTheme } from '@bluebase/core';

// tslint:disable: jsx-no-lambda

export const HomeScreen = (props: any) => {
	const { changeTheme, theme } = useTheme();

	const navigate = (route?: any, params?: any) => () => props.navigation.navigate(route, params);
	const push = (route?: any, params?: any) => () => props.navigation.push(route, params);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				<List.Subheader>Settings</List.Subheader>
				<List.Item
					title="Mode"
					description={theme.mode === 'light' ? 'Light' : 'Dark'}
					onPress={() =>
						theme.mode === 'light' ? changeTheme('bluebase-dark') : changeTheme('bluebase-light')
					}
				/>
				<Divider />
				<List.Subheader>Demos</List.Subheader>
				<List.Item
					title="Static navigationOptions"
					description="Screen with Static Navigation Options"
					onPress={navigate('Settings')}
				/>
				<Divider />
				<List.Item
					title="Wrapped Route"
					description="A screen that has nested navigator, with a wrapped screen"
					onPress={navigate('WrappedSettings')}
				/>
				<Divider />
				<List.Item title="Native Stack" onPress={navigate('NativeStack')} />
				<Divider />
				<List.Item title="Modal" onPress={navigate('Modal')} />
				<Divider />
				<List.Item
					title="Params"
					description="See Params play"
					onPress={navigate('Params', { foo: 'bar', bar: 'baz' })}
				/>
				<Divider />
				<List.Item title="Push" description="Push to Screen" onPress={push('TabsDemo')} />
				<Divider />
				<List.Item title="Tabs" onPress={navigate('TabsDemo')} />
				<Divider />
				<List.Item title="Bottom Tabs" onPress={navigate('SettingsBottomTabs')} />
				<Divider />
				<List.Item title="Drawer" onPress={navigate('SettingsDrawer')} />
				<Divider />
				<List.Item
					title="App 1 (route name)"
					// description="Go to Settings Page"
					onPress={navigate('App1')}
				/>
				<Divider />
				<List.Item
					title="App 1 (path)"
					// description="Go to Settings Page"
					onPress={navigate({ path: 'p/app-1?foo=bar' })}
				/>
			</ScrollView>
		</View>
	);
};
